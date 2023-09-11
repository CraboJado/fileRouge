import { Component, OnInit } from '@angular/core';
import { AbsenceService } from "../../../shared/service/absence.service";
import { Absence } from "../../../shared/model/absence";
import { ChartConfiguration, ChartOptions } from "chart.js";
import { formatDate } from "@angular/common";
import { DepartementService } from "../../../shared/service/departement.service";
import { EmployeService } from "../../../shared/service/employe.service";
import { Departement } from "../../../shared/model/departement";
import { Employe } from "../../../shared/model/employe";
import { switchMap } from "rxjs";
import { JoursOffService } from "../../../shared/service/jours-off.service";
import { JoursOff } from "../../../shared/model/jours-off";
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-rapports-vue-one',
  templateUrl: './rapports-vue-one.component.html',
  styleUrls: ['./rapports-vue-one.component.css']
})
export class RapportsVueOneComponent implements OnInit {

  selectMonth: string = "";
  annees: number[] = []
  absences: Absence[] = []
  employes: Employe[] = []
  departements: Departement[] = []
  joursOffs: JoursOff[] = []
  departementGeneral: Departement = { id: 0, name: "tout le monde" }
  currentMonth: number = new Date().getMonth();
  currentYear: number = new Date().getFullYear()
  currentMonthString: string = "";
  months: number[] = [];
  lineChartData: any[] = []
  lineChartLabels: string[] = []


  constructor(private absenceService: AbsenceService,
              private departementService: DepartementService,
              private employeService: EmployeService,
              private jourOffService: JoursOffService) {
  }


  employeByDepartement(departementId: string) {

    if (parseInt(departementId) == 0) {
      this.employeService.findAll().subscribe(list => {
        this.employes = list
        this.updateLineChartLabels()
      })
    } else {
      this.employeService.findAll().subscribe(list => {
        this.employes = list.filter(employe => employe.departement?.id == parseInt(departementId));
        this.updateLineChartLabels()
      })
    }

  }

  updateLineChartData() {
    this.lineChartData = this.employes.map((employe, index) => {
      const dataPoints = this.lineChartLabels.map((label) =>
        this.nbAbsencePerDayPerEmploye(label, employe)
      );
      const hue = (index / this.employes.length) * 360;
      return {
        data: dataPoints, // Array of data points for the dataset
        label: employe.firstName,
        backgroundColor: `hsla(${hue}, 100%, 50%, 1)`,
        stack: 'stack 1',
      };
    });
  }
  nbAbsencePerDayPerEmploye(date: string, employe: Employe) {
    let nbTotal = 0;


    for (let absence of this.absences) {
      //@ts-ignore
      for (let dateTempo of this.getDates(absence.dateDebut, absence.dateFin)) {
        if (date == dateTempo && absence.employe?.id == employe.id) {
          nbTotal++;
        }
      }

    }
    return nbTotal
  }

  getDates(startDate: Date, endDate: Date) {
    const dates: string[] = [];
    let currentDate = new Date(startDate);
    let maxDate= new Date(endDate)
    while (currentDate<=new Date(endDate)) {
      for(let jours of this.joursOffs){

        if(jours.jour==currentDate) {
          currentDate.setDate(currentDate.getDate() + 1);
        }
      }
      if(currentDate.getDay()==0 || currentDate.getDay()==6){
        currentDate.setDate(currentDate.getDate() + 1);
      }else {
        dates.push(formatDate(currentDate, 'yyyy-MM-dd', 'en-US'));
        currentDate.setDate(currentDate.getDate() + 1);
      }

    }
    return dates;
  }

  lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom'
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y: {
        position: 'left',
        suggestedMax: 5,
      },
    },
  };

  lineChartLegend = true;
  lineChartType = 'line';

  ngOnInit(): void {
    this.employeService.findAll().pipe(
      switchMap((employes) => {
        this.employes = employes;
        return this.absenceService.findAll();
      }),
      switchMap((absences) => {
        this.absences = absences as Absence[];
        return this.jourOffService.findAll();
      })
    ).subscribe((joursOff) => {
      this.joursOffs = joursOff;
      this.updateLineChartLabels();
    });

    this.departementService.findAll().subscribe(t => {
      this.departements = t
      this.departements.push(this.departementGeneral)
    })

    for (let i = 1980; i < 2050; i++) {
      this.annees.push(i)
    }
  }

  updateLineChartLabels() {
    this.lineChartLabels = Array.from({ length: 31 }, (_, i) => {
      const date = new Date();
      date.setMonth(this.currentMonth);
      date.setDate(i + 1);
      date.setFullYear(this.currentYear)
      return formatDate(date, 'yyyy-MM-dd', 'en-US');

    });

    this.updateLineChartData()
  }

  changeCurrentYear(year: string) {
    this.currentYear = parseInt(year)
    this.updateLineChartLabels()
  }

  getMonthValue(monthName: string){
    switch (monthName) {
      case "Janvier":
        this.currentMonth = 0;
        console.log(  this.currentMonth);

        break;
      case "Fevrier":
        this.currentMonth = 1;
        break;
      case "Mars":
        this.currentMonth = 2;
        break;
      case "Avril":
        this.currentMonth = 3;
        break;
      case "Mai":
        this.currentMonth = 4;
        break;
      case "Juin":
        this.currentMonth = 5;
        break;
      case "Juillet":
        this.currentMonth = 6;
        break;
      case "Août":
        this.currentMonth = 7;
        break;
      case "Septembre":
        this.currentMonth = 8;
        break;
      case "Octobre":
        this.currentMonth = 9;
        break;
      case "Novembre":
        this.currentMonth = 10;
        break;
      case "Décembre":
        this.currentMonth = 11;
        break;
    }
    this.updateLineChartLabels()
  }




  exportToExcel() {
    // Prepare the data for Excel export
    const excelData = [];

    // Add headers as the first row
    excelData.push(['Date', ...this.employes.map(employe => employe.firstName)]);

    // Add data rows
    for (let i = 0; i < this.lineChartLabels.length; i++) {
      const rowData = [this.lineChartLabels[i], ...this.lineChartData.map(dataset => dataset.data[i])];
      excelData.push(rowData);
    }

    // Create a worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(excelData);

    // Create a workbook
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Chart Data'); // 'Chart Data' is the name of the sheet

    // Generate a Blob containing the Excel file and trigger download
    XLSX.writeFile(wb, 'chart_data.xlsx'); // 'chart_data.xlsx' is the file name
  }


}
