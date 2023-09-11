import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Employe} from "../../../shared/model/employe";
import {EmployeService} from "../../../shared/service/employe.service";
import {SharedDataService} from "../../../shared/service/active-role.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  activeEmploye:Employe={}

  sendDataToNavBar(value:string) {
    const dataToSend = { key: value }; // Replace this with the actual data
    this.sharedDataService.sendEventData(dataToSend);
  }
  constructor(private employeService:EmployeService,private sharedDataService: SharedDataService) {
  }


  getActive(){
    this.employeService.findActive().subscribe(t=>this.activeEmploye=t)
  }

  ngOnInit(): void {

    this.getActive()

  }


}
