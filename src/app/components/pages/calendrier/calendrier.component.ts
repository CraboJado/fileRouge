import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import frLocale from '@fullcalendar/core/locales/fr';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; 

@Component({
  selector: 'app-departements',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.css']
})
export class CalendrierComponent {
  calendarOptions: CalendarOptions = {
    plugins: [interactionPlugin, dayGridPlugin],
    locale: frLocale,
    initialView: 'dayGridMonth',
    weekends: false,
    selectable: true,
    dateClick: function(info) {
      alert('Clicked on: ' + info.dateStr);
      alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
      alert('Current view: ' + info.view.type);
      // change the day's background color just for fun
      info.dayEl.style.backgroundColor = 'red';
    },
    events: [
      { title: 'Meeting', start: new Date() }
    ]
  };
}
