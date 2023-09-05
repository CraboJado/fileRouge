import {ChangeDetectorRef, Component, OnInit, signal} from '@angular/core';
import {JoursOffService} from "../../../shared/service/jours-off.service";
import {JoursOff} from "../../../shared/model/jours-off";
import {CalendarOptions, EventApi} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import frLocale from '@fullcalendar/core/locales/fr';
import interactionPlugin, {DateClickArg} from '@fullcalendar/interaction';


@Component({
  selector: 'app-jours-off',
  templateUrl: './jours-off.component.html',
  styleUrls: ['./jours-off.component.css']
})

export class JoursOffComponent implements OnInit {

  joursOffs: JoursOff[] = [];
  showPopover: boolean = false;
  selectedDate: string | null = null;
  selectedOption: string = '';
  calendarOptions: CalendarOptions = {
    locale: frLocale,
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
      bootstrap5Plugin
    ],
    themeSystem: 'bootstrap5',
    headerToolbar: {
      left: 'prev,next,prevYear,nextYear,today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    events: [],
    weekends: false,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    dateClick: this.handleDateClick.bind(this),
    // select: this.handleDateSelect.bind(this),
    //eventClick: this.handleEventClick.bind(this),
    // eventsSet: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  currentEvents = signal<EventApi[]>([]);

  constructor(
    private jourOffService: JoursOffService,
    private changeDetector: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this._init();
  }

  handleDateClick(selectInfo: DateClickArg) {
    this.showPopover = true;

  }

  /*
  handleDateSelect(selectInfo: DateSelectArg) {
    this.showDropdown = true;
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
  }
*/
  handleDropdownChange() {
    console.log('Option sélectionnée :', this.selectedOption);
    this.showPopover = false;
  }

  handleGetJoursOffJson() {
    this.jourOffService.findAll().subscribe(
      jo => {
        this.joursOffs = jo;
        // this._init();// test calendar
      })
  }

  private _init() {
    this.jourOffService.findAll().subscribe(jourOffReceived => {
        this.joursOffs = jourOffReceived;

        // Load calendar data
        this.calendarOptions.events = this.joursOffs.map(jourOff => (
          {
            id: jourOff.id + '',
            title: jourOff.description,
            date: jourOff.jour,
            description: jourOff.typeJour,
            extendedProps: {
              department: 'test'
            },
            display: 'background',
            color: this.getEventBackgroundColor(jourOff.typeJour),
            textColor: 'black'
          }));
      },
      (error) => {
        console.error("Erreur lors de la récupération des jours officiels :", error);
      });
  }

  //
  private getEventBackgroundColor(typeJour: string | undefined): string {
    if (typeJour) {
      switch (typeJour) {
        case 'JOUR_FERIE':
          return '#ff580f';
        case 'RTT_EMPLOYEUR':
          return '#caffff';
        default:
          return '';
      }
    } else {
      return '';
    }
  }
}
