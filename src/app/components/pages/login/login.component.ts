import { Component } from '@angular/core';
import {Departement} from "../../../shared/model/departement";
import {Employe} from "../../../shared/model/employe";
import {LoginService} from "../../../shared/service/login.service";
import {DepartementService} from "../../../shared/service/departement.service";
import {EmployeService} from "../../../shared/service/employe.service";
import {AbsenceService} from "../../../shared/service/absence.service";
import {JoursOffService} from "../../../shared/service/joursOff.service";
import {JoursOff} from "../../../shared/model/joursOff";
import {Absence} from "../../../shared/model/absence";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  departements:Departement[]=[];
  employes:Employe[]=[];
  absences:Absence[]=[];
  joursOffs:JoursOff[]=[];
  cookie:string="";

  constructor(private loginService:LoginService,
              private departementService:DepartementService,
              private employeService:EmployeService,
              private absenceService:AbsenceService,
              private jourOffService:JoursOffService
) {
  }

  testLogin(email:string,password:string){
    console.log("connecté")
    this.loginService.loging(email,password)
  }



  testEmploye(){
    this.employeService.findAll().subscribe(t=>this.employes=t)
  }

  testGetDeparteemnt(){
    this.departementService.findAll().subscribe(t=>this.departements=t)
  }
  testGetAbsence(){
    this.absenceService.findAll().subscribe(t=>this.absences=t)
  }
  testGetJoursOff(){
    this.jourOffService .findAll().subscribe(t=>this.joursOffs=t)
  }


  testtetst(){
   console.log(this.employes.find(t=>t.id==1));
  }


  postDepartement(){
    this.departementService.postDepartement()
  }

}
