import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {EmployeService} from "../shared/service/employe.service";
import {Router} from "@angular/router";
import {LoginService} from "../shared/service/login.service";
import {Employe} from "../shared/model/employe";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  roles: string[] | null = null;

  constructor(private _router:Router,
              private loginService: LoginService ) {
  }
  login(email: string, password: string): Observable<boolean> {
    return new Observable<boolean>((observer) =>{
      this.loginService.login(email, password).subscribe(
        {
          next: (res)=>{
              localStorage.setItem('roles', JSON.stringify(res.body));
              observer.next(true)},
          error:(err)=>{
              observer.error(err)
          },
          complete:()=>{console.log('complete')}
        }
      )
    })
  }

  logout(): void {
    localStorage.clear()
  }

}
