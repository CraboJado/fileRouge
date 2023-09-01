import { Component } from '@angular/core';
import {LoginService} from "../../shared/service/loginService";
import {DepartementService} from "../../shared/service/departementService";
import {Departement} from "../../shared/model/departement";
import {EmployeService} from "../../shared/service/employeService";
import {Employe} from "../../shared/model/employe";

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

  testLogin(username:string,password:string){
    console.log("connecté")
    this.loginService.login(username,password)
  }


  testEmploye(){
    this.employeService.findAll().subscribe(t=>this.employes=t)
  }

  testGetDeparteemnt(){
    this.departementService.findAll().subscribe(t=>this.departements=t)
  }

}
