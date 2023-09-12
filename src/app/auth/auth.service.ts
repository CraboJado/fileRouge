import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {EmployeService} from "../shared/service/employe.service";
import {Router} from "@angular/router";
import {LoginService} from "../shared/service/login.service";
import {Employe} from "../shared/model/employe";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  roles: string[] | null = null;

  private _baseUrlOut = environment.urlApi.logout;
  constructor(private _router:Router,
              private loginService: LoginService,
              private http: HttpClient) {
  }
  login(email: string, password: string): Observable<boolean> {
    return new Observable<boolean>((observer) =>{
      this.loginService.login(email, password).subscribe(
        {
          next: (res)=>{
              localStorage.setItem('roles', JSON.stringify(res.body));
              observer.next(true)},
          error:(err)=>{
              observer.error(err)},
          complete:()=>{console.log('complete')}
        }
      )
    })
  }
  logout() {
    localStorage.clear()
    this.http.post(`${this._baseUrlOut}`,{},{withCredentials: true})
  }
}
