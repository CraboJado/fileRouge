import {Component, OnInit} from '@angular/core';
import {AbsenceService} from "../../../shared/service/absence.service";
import {Absence} from "../../../shared/model/absence";
import {ChartOptions} from "chart.js";
import {formatDate} from "@angular/common";
import {DepartementService} from "../../../shared/service/departement.service";
import {EmployeService} from "../../../shared/service/employe.service";
import {Departement} from "../../../shared/model/departement";
import {Employe} from "../../../shared/model/employe";

@Component({
  selector: 'app-rapports-vue-one',
  templateUrl: './rapports-vue-one.component.html',
  styleUrls: ['./rapports-vue-one.component.css']
})
export class RapportsVueOneComponent implements  OnInit{


  absences:Absence[]=[]
  employes:Employe[]=[]
  departements:Departement[]=[]

  currentMonth:number = new Date().getMonth();

  currentYear:number=new Date().getFullYear()


  absenceList:Date[] = [
    new Date('2013-04-13'),
    new Date('2013-04-14'),
    new Date('2013-04-13')
  ];

 // lineChartData: any[] = [{ data: Array(50).fill(1), label: 'bonjour' }];
  lineChartData: any[] = [ {
    data: [], // Your data values for the first dataset
    label: 'Dataset 1',
    backgroundColor: 'rgba(255, 99, 132, 0.2)', // Color for the bars
    stack : 'stack 1'
  },
    {
      data: [], // Your data values for the second dataset
      label: 'Dataset 2',
      backgroundColor: 'rgba(54, 162, 235, 0.2)', // Color for the bars
      stack: 'stack 1'
    },];
  lineChartLabels: string[] = []
  constructor(private absenceService:AbsenceService,
              private departementService:DepartementService,
              private employeService:EmployeService) {
  }


  employeByDepartement(departementId:number){

    this.employeService.findAll().subscribe(t=>{
      this.employes=t;
      this.employes.filter(t=>t.departement?.id==departementId);
    })



  }



nbAbsencePerDay(date:string):number{
  let nbTotal=0;
  for(let absence of this.absences){
      if(absence.dateDebut?.toString()==date.toString()){
        nbTotal++;
    }
}
  return nbTotal
}

nbTest(date:string):number{
  let nbTotal=0;
  for(let absence of this.absences){
    if(absence.dateDebut?.toString()!=date.toString()){
      nbTotal++;
    }
  }
  return nbTotal

}


  lineChartInit(){
      this.lineChartData[0].data = this.lineChartLabels.map(label => this.nbAbsencePerDay(label));
      this.lineChartData[1].data= this.lineChartLabels.map(label => this.nbTest(label));
  }
  lineChartOptions: any = {
    responsive: true,
  };
  lineChartLegend = true;
  lineChartType = 'line';

  ngOnInit(): void {
    this.absenceService.findAll().subscribe(t => {
      this.absences = t;
      this.updateLineChartLabels()
    });


  }




  changeMonth(change: number) {
    this.currentMonth += change;

    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear+=1
    } else if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear+=-1
    }

    this.updateLineChartLabels();
  }
  updateLineChartLabels() {
    this.lineChartLabels = Array.from({ length: 31 }, (_, i) => {
      const date = new Date();
      date.setMonth(this.currentMonth);
      date.setDate(i + 1);
      date.setFullYear(this.currentYear)
      return formatDate(date, 'yyyy-MM-dd', 'en-US');
    });
    this.lineChartInit();
  }



}
