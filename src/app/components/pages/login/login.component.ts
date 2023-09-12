import {Component, Injectable} from '@angular/core';
import { Router } from '@angular/router';
import {LoginService} from "../../../shared/service/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private router: Router,
    private loginService: LoginService
  ) {
  }

  signIn(email: string, password: string) {
    this.loginService.login(email,password).subscribe({
      next:(value)=>{this.router.navigate(['/home'])},
      error:(err)=>{console.log("err à traiter si on a temps")}
    })
  }


}
