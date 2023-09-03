import { Component } from '@angular/core';
import {Departement} from "../../../shared/model/departement";
import {Employe} from "../../../shared/model/employe";
import {LoginService} from "../../../shared/service/login.service";
import {DepartementService} from "../../../shared/service/departement.service";
import {EmployeService} from "../../../shared/service/employe.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  departements:Departement[]=[];
  employes:Employe[]=[];

  constructor(private loginService:LoginService, private departementService:DepartementService, private employeService:EmployeService) {
  }

  testLogin(email:string,password:string){
    console.log("connecté")
    this.loginService.login(email,password)
  }


  testEmploye(){
    this.employeService.findAll().subscribe(t=>this.employes=t)
  }

  testGetDeparteemnt(){
    this.departementService.findAll().subscribe(t=>this.departements=t)
  }

}
