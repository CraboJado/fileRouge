import {Component, Input, OnInit} from '@angular/core';
import {LoginService} from "../../../shared/service/login.service";


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
  roles: string [] | undefined = [];


  constructor(private loginService:LoginService) {
  }

  ngOnInit(): void {
    this.roles =  this.loginService.roles ;
  }

  logOut(){
    this.isMenuCollapsed = true;
    this.loginService.logout();
  }

}
