import { Component, OnInit } from '@angular/core';
import { CalendarOption } from "@fullcalendar/angular/private-types";
import { Absence } from "../../../shared/model/absence";
import { Employe } from "../../../shared/model/employe";
import { Departement } from "../../../shared/model/departement";
import { JoursOff } from "../../../shared/model/jours-off";
import { AbsenceService } from "../../../shared/service/absence.service";
import { DepartementService } from "../../../shared/service/departement.service";
import { EmployeService } from "../../../shared/service/employe.service";
import { JoursOffService } from "../../../shared/service/jours-off.service";
import { formatDate } from "@angular/common";
import { ChartConfiguration } from "chart.js";
import { switchMap } from "rxjs";

@Component({
  selector: 'app-rapports-vue-two',
  templateUrl: './rapports-vue-two.component.html',
  styleUrls: ['./rapports-vue-two.component.css']
})
export class RapportsVueTwoComponent implements OnInit {


  annees: number[] = []

  absences: Absence[] = []
  employes: Employe[] = []
  departements: Departement[] = []
  joursOffs: JoursOff[] = []
  departementGeneral: Departement = { id: 0, name: "tout le monde" }
  currentMonth: number = new Date().getMonth();
  currentYear: number = new Date().getFullYear()
  // daysInMonth: number = 0; // Initialisez à 0

  lineChartData: any[] = []
  lineChartLabels: string[] = []
  lineChartLabels2: string[] = []

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
    let maxDate = new Date(endDate)
    while (currentDate <= new Date(endDate)) {
      for (let jours of this.joursOffs) {

        if (jours.jour == currentDate) {
          currentDate.setDate(currentDate.getDate() + 1);
        }
      }
      if (currentDate.getDay() == 0 || currentDate.getDay() == 6) {
        currentDate.setDate(currentDate.getDate() + 1);
      } else {
        dates.push(formatDate(currentDate, 'yyyy-MM-dd', 'en-US'));
        currentDate.setDate(currentDate.getDate() + 1);
      }

    }

    return dates;
  }

  isWeekEnd(date: string): boolean {
    const date1 = new Date(date)
    return (date1.getDay() == 0 || date1.getDay() == 6);
  }
  isJourOff(date: string): boolean {
    let bool = false;
    for (let jour of this.joursOffs) {
      if (jour.jour?.toString() == date) {
        return true
      }
    }

    return false;
  }


  lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
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

  changeMonth(change: number) {
    this.currentMonth += change;

    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear += 1
    } else if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear += -1
    }

    this.updateLineChartLabels()
  }

  getDaysInMonth(year: number, month: number): number {
    const lastDayOfMonth = new Date(year, month + 1, 0);
    return lastDayOfMonth.getDate();
  }

  updateLineChartLabels() {
    this.lineChartLabels = Array.from({ length: 31 }, (_, i) => {
      const date = new Date();
      date.setMonth(this.currentMonth);
      date.setDate(i + 1);
      date.setFullYear(this.currentYear)
      return formatDate(date, 'yyyy-MM-dd', 'en-US');
    });

    const daysInMonth = this.getDaysInMonth(this.currentYear, this.currentMonth);
    this.lineChartLabels2 = Array.from({ length: daysInMonth }, (_, i) => {
      return i + 1 + ""
    });
    this.updateLineChartData()
  }

  changeCurrentYear(year: string) {
    this.currentYear = parseInt(year)
    this.updateLineChartLabels()
  }

  months: string[] = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];
  
  getMonthName(monthNumber: number): string {
    return this.months[monthNumber];
  }
}
