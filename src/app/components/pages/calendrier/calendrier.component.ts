import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { Calendar, CalendarOptions } from '@fullcalendar/core';
import frLocale from '@fullcalendar/core/locales/fr';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; 
import { Absence } from 'src/app/shared/model/ansence';

@Component({
  selector: 'app-departements',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.css']
})
export class CalendrierComponent implements OnInit{

  @ViewChild('fullcalendar') calendarComponent!: FullCalendarComponent;
 
 
  showForm = false;
  events:any =[]

  

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin,interactionPlugin],
    dateClick: this.handleDateClick.bind(this), // MUST ensure `this` context is maintained
    events: [
      { id: 'id1', 
      date: '2023-09-01' ,
      display: 'background',
      color:'#ff9f89',
    },
      { id: 'id2', 
      date: '2023-09-05' ,
      display: 'background',
      color:'#898fff'
    }
    ],
    
};

 constructor(private _http:HttpClient){}
  ngOnInit(): void {
    
    this._http.get<Absence[]>('localhost:8080/absence')
    .subscribe(abs => console.log(abs))
  }

  



handleDateClick(arg:any) {

  //TODO when click, check if in
  // console.log(this.calendarComponent.options?.events)
  
  // console.log(arg.dateStr)
  
  // this.showForm = !this.showForm 
  // alert('date click! ' + arg.dateStr)
}
}
