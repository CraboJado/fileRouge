import { CanActivateFn } from '@angular/router';
import {inject} from '@angular/core';
import { Router } from '@angular/router';
import {EmployeService} from "../shared/service/employe.service";
import {Observable} from "rxjs";
import {LoginService} from "../shared/service/login.service";

export const authGuard: CanActivateFn = (route, state) => {
console.log("authGuard ======================")

  const loginService= inject(LoginService);
  const employeService = inject(EmployeService);
  const router = inject(Router);


  return new Observable<boolean>((observer) =>{
    employeService.findActive().subscribe({
      next:(res)=>{
        localStorage.setItem('employe', JSON.stringify(res.body));
        loginService.roles = res.body?.roles
        observer.next(true);
        observer.complete();
      },
      error:()=>{
        router.navigateByUrl('/login');
        observer.next(false)
        observer.complete();
      }
    })
  })


};
