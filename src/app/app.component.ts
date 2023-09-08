import {Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Gestion des congés et jours feriés';



  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: any) {
    localStorage.clear();
  }



}
