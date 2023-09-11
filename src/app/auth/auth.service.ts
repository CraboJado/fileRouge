import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {EmployeService} from "../shared/service/employe.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string | null = null;

  constructor(private _employeService: EmployeService) {
  }
  login(): any {
    this._employeService.findActive()
      .subscribe({
        next:() => {
          console.log("loggé")
          this.isLoggedIn = true
        },
        error:()=>{ console.log("direct to page login")},
        complete:()=>{console.log("complet")}
  })

  }

  logout(): void {
    this.isLoggedIn = false;
  }

}
