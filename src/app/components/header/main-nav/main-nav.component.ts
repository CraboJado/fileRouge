import {Component, Input, OnInit} from '@angular/core';
import {SharedDataService} from "../../../shared/service/active-role.service";
import {EmployeService} from "../../../shared/service/employe.service";
import {Employe} from "../../../shared/model/employe";
import {LoginService} from "../../../shared/service/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit{
  // Create a property to track whether the menu is open.
  // Start with the menu collapsed so that it does not
  // appear initially when the page loads on a small screen!
  isMenuCollapsed = true;
  event:any = {}

  employe:Employe= {}
  constructor( private employeService:EmployeService,private loginService:LoginService, private router:Router) {
  }

  ngOnInit(): void {

    this.employeService.findActive().subscribe(t=>this.employe=t)

  }



logout(){
    this.employeService.logout().subscribe()
    this.router.navigate(['/login'])
}




}
