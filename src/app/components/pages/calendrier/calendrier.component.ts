import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import {
  Calendar,
  CalendarOptions,
  EventSourceInput,
} from '@fullcalendar/core';
import frLocale from '@fullcalendar/core/locales/fr';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Absence } from 'src/app/shared/model/absence';
import { AbsenceService } from 'src/app/shared/service/absence.service';

@Component({
  selector: 'app-departements',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.css'],
})
export class CalendrierComponent implements OnInit {
  @ViewChild('fullcalendar') calendarComponent!: FullCalendarComponent;

  showForm = false;
  absences: Absence[] = [];
  event:any = {}

  constructor(private _absenceService: AbsenceService) {}

  ngOnInit(): void {
    this._init();
  
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: this.handleDateClick.bind(this), // MUST ensure `this` context is maintained
    eventClick: this.handleEventClick.bind(this),
    events: [],
  };

  private _init() {
    this._absenceService.findAll().subscribe((absencesReceived) => {
      this.absences = absencesReceived;
      this.calendarOptions.events = this.absences.map((abs) => {

        let color = '#e398a2';
        if (abs.statut == 'EN_ATTENTE') color = '#fcba03';
        if (abs.statut == 'VALIDEE' && abs.typeAbsence =='RTT') color = '#98e1e3';
        if (abs.statut == 'VALIDEE' && abs.typeAbsence =='CONGE_PAYE') color = '#03fc90';
        if (abs.statut == 'REJETEE') color = '#fc0324';

        const id:string = abs.id+'';

        return {
          id: id,
          start:abs.dateDebut,
          end: abs.dateFin,
          display: 'background',
          color: color,
        };
      });
    });
  }
  handleEventClick(info:any){
    info.jsEvent.preventDefault();
    this.event = info.event
  }

  handleDateClick(arg: any) {
    console.log(this.event.id)
    if(this.event.id){
      console.log("update or delete")
      this.event={};
    }else{
      console.log("creer")
    }
  }




}
