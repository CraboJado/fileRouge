import {Component} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Departement} from "../../../shared/model/departement";
import {Employe} from "../../../shared/model/employe";
import {LoginService} from "../../../shared/service/login.service";
import {DepartementService} from "../../../shared/service/departement.service";
import {EmployeService} from "../../../shared/service/employe.service";
import {AbsenceService} from "../../../shared/service/absence.service";
import {JoursOffService} from "../../../shared/service/jours-off.service";
import {JoursOff} from "../../../shared/model/jours-off";
import {Absence} from "../../../shared/model/absence";
import {layouts} from "chart.js";
import {SharedLayoutComponent} from "../../layout/shared-layout/shared-layout.component";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  departements: Departement[] = [];
  employes: Employe[] = [];
  absences: Absence[] = [];
  joursOffs: JoursOff[] = [];
  cookie: string = "";
  activeEmploye:Employe={};


  constructor(
    private loginService: LoginService,
    private departementService: DepartementService,
    private employeService: EmployeService,
    private absenceService: AbsenceService,
    private jourOffService: JoursOffService,
    private router: Router,
  ) {
  }

  tryLogin(email: string, password: string) {
    console.log("connecté")
    this.loginService.login(email, password)


  }


  testLogout(){
    this.employeService.logout().subscribe(t=>console.log(t))
  }

  testActive(){
    this.employeService.findActive().subscribe(t=>this.activeEmploye=t)
  }




  testEmploye() {
    this.employeService.findAll().subscribe(t => this.employes = t)
  }

  testGetDeparteemnt() {
    this.departementService.findAll().subscribe(t => this.departements = t)
  }

  testGetAbsence() {
    this.absenceService.findAll().subscribe(t => this.absences = t)
  }

  testGetJoursOff() {
    this.jourOffService.findAll().subscribe(t => this.joursOffs = t)
  }


  testtetst() {
    console.log(this.employes.find(t => t.id == 1));
  }


  postDepartement(nom: string) {
    this.departementService.create(nom)
  }

}
