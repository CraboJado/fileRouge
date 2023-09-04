import {Component, OnInit} from '@angular/core';
import { JoursOffService } from "../../../shared/service/jours-off.service";
import { JoursOff } from "../../../shared/model/jours-off";
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';

@Component({
  selector: 'app-jours-off',
  templateUrl: './jours-off.component.html',
  styleUrls: ['./jours-off.component.css']
})

export class JoursOffComponent implements OnInit {

  joursOffs: JoursOff[] = [];

  constructor(
    private jourOffService: JoursOffService
  ) {
  }

  ngOnInit(): void {
    this._init();
  }

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin, bootstrap5Plugin],
    themeSystem: 'bootstrap5',
    locale: frLocale,
    initialView: 'dayGridMonth',
    headerToolbar: {
      start: 'title',
      end: 'today prev,next'
    },
    weekends: false,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    events:[]
    /*events: [
      {
        date: '2023-09-11',
        display: 'background',
        color: '#ff9f89'
      },
      {
        start: '2023-09-13',
        end: '2023-09-13',
        display: 'background',
        color: 'green'
      },
      {
        start: '2023-09-24',
        end: '2023-09-28',
        overlap: false,
        display: 'background',
        color:'#360454'
      },
      {
        start: '2023-09-06',
        end: '2023-09-08',
        overlap: false,
        display: 'background'
      }
    ]*/
  };

  private _init() {
    this.jourOffService.findAll().subscribe(jourOffReceived => {

      this.joursOffs = jourOffReceived;

      // Load calendar data
      this.calendarOptions.events = this.joursOffs.map(
        jourOff => ({
       // id: jourOff.id, TODO FIX: error id number / string
        title: jourOff.description,
        date: jourOff.jour,
        description: jourOff.typeJour,
        extendedProps: {
          department: 'test'
        },
        display: 'background',
        color: 'green',
        textColor:'black'
      }));
    },
    (error) => {
      console.error("Erreur lors de la récupération des jours officiels :", error);
    }
    );
  }

  testJouOff() {
    this.jourOffService.findAll().subscribe(
      jo =>
      {this.joursOffs = jo;
     // this._init();// test calendar
  })
  }
}
