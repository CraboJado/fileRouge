import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {JoursOffService} from "../../../shared/service/jours-off.service";
import {JoursOff} from "../../../shared/model/jours-off";
import {CalendarOptions} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import interactionPlugin, {DateClickArg} from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-jours-off',
  templateUrl: './jours-off.component.html',
  styleUrls: ['./jours-off.component.css']
})

export class JoursOffComponent implements OnInit {

  joursOffs: JoursOff[] = [];
  jo: any = {};
  typesJour: string[] = [];
  showPopover: boolean = false;
  selectedEvent: JoursOff | null = null;
  editable: boolean = false;

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
    events: this.joursOffs.map(jourOff => ({
      id: jourOff.id?.toString() || '',
      title: jourOff.description || '',
      start: jourOff.jour || '',
      allDay: true,
    })),
    initialView: 'dayGridMonth',
    weekends: false,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    // eventClick: this.handleEventClick.bind(this),
    dateClick: this.handleDateClick.bind(this),
    // select: this.handleDateSelect.bind(this),
    // eventsSet: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };

  constructor(
    private _jourOffService: JoursOffService,
    private datePipe: DatePipe,
    private changeDetector: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this._init();
  }

  reInitJourOff() {
    this.jo = {};
  }

  handleDateClick(clickInfo: DateClickArg) {
    const clickedDate = this.datePipe.transform(clickInfo.date, 'yyyy-MM-dd');
    console.log('Date séléctionnée :', clickedDate);

    const existedJourOff = this.joursOffs.find(jourOff => {
      const joDate = this.datePipe.transform(jourOff.jour, 'yyyy-MM-dd');
      return joDate === clickedDate;
    });

    console.log('Date jo :', this.jo.jour);
    if (existedJourOff) {
      console.log('Formulaire Edition');
      this.editable = true;
      this.selectedEvent = existedJourOff;
      console.log('Evenement :', this.selectedEvent);
      this.jo = {...existedJourOff};
    } else {
      console.log('Formulaire Création');
      this.editable = false;
      this.selectedEvent = null;
      //clickedDate =
      //this.jo = {};
    }

    this.showPopover = true;
  }

  createOrUpdateJourOff() {
    /*
    if (this.editable) {
      this.updateJourOff(this.selectedEvent);
      this.reInitJourOff();
      this._init();
    } else {
      this.createJourOff();
      this.reInitJourOff();
      this._init();
    }
*/
    if (!this.jo.id) {
      this._jourOffService.create(this.jo)
        .subscribe(() => {
            this._init();
            this.reInitJourOff();
          }, (error) => {
            console.error("Erreur lors de la création du jour officiel", error);
          }
        );
    } else {
      this._jourOffService.update(this.jo)
        .subscribe(
          () => {
            this._init();
            this.reInitJourOff();
          },
          (error) => {
            console.error("Erreur lors de la modification du jour officiel", error);
          }
        );
    }
  }

  /*
  createJourOff() {
    this._jourOffService.create(this.jo)
      .subscribe(() => {
        this._init();
      });
  }

  updateJourOff(event: JoursOff | null) {
    if (event) {
      this._jourOffService.update(event)
        .subscribe(
          () => {
            this._init();
          },
          (error) => {
            console.error("Erreur lors de la modification du jour officiel", error);
          }
        );
    }
  }*/

  deleteJourOff(id?: number) {
    if (id) {
      this._jourOffService.delete(id)
        .subscribe(
          () => {
            this._init();
          },
          (error) => {
            console.error("Erreur lors de la suppression du jour officiel", error);
          }
        );
    }
  }

  private _init() {
    this._jourOffService.findAll().subscribe(jourOffReceived => {
        this.joursOffs = jourOffReceived;
        this.calendarOptions.events = this.joursOffs.map(jourOff => ({
          id: jourOff.id + '',
          title: jourOff.description || '',
          start: jourOff.jour || '',
          typeJour: jourOff.typeJour || '',
          allDay: true,
          display: 'background',
          color: this.getEventBackgroundColor(jourOff.typeJour),
        }));
        this.typesJour = [...new Set(jourOffReceived.map(jourOff => jourOff.typeJour || ''))];
        this.jo.typeJour = this.typesJour[0] || '';
      },
      (error) => {
        console.error("Erreur lors de la récupération des jours officiels :", error);
      });
  }

  // Définir la couleur en fonction du Type Jour
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
