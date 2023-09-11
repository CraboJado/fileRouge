import {Component, HostListener} from '@angular/core';
import {Employe} from "./shared/model/employe";
import {EmployeService} from "./shared/service/employe.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Gestion des congés et jours feriés';



}
