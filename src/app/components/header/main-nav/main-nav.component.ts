import {Component, Input, OnInit} from '@angular/core';
import {SharedDataService} from "../../../shared/service/active-role.service";

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent{
  // Create a property to track whether the menu is open.
  // Start with the menu collapsed so that it does not
  // appear initially when the page loads on a small screen!
  isMenuCollapsed = true;


  event:any = {}

  constructor(private sharedDataService: SharedDataService) {
    this.sharedDataService.eventData$.subscribe((data) => {
      this.event = data;
    });



}
}
