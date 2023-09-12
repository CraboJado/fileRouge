import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../../auth/auth.service";


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
  roles: string [] | null = null;
  constructor( private authService : AuthService) {
  }
  ngOnInit(): void {
    this.roles =  this.authService.roles ;
  }
  logOut(){
    this.isMenuCollapsed = true;
    this.authService.logout();
  }
}
