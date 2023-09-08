import {ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {JoursOffService} from "../../../shared/service/jours-off.service";
import {JoursOff} from "../../../shared/model/jours-off";
import {CalendarOptions} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import {NgbOffcanvas} from '@ng-bootstrap/ng-bootstrap';
import interactionPlugin, {DateClickArg} from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-jours-off',
  templateUrl: './jours-off.component.html',
  styleUrls: ['./jours-off.component.css']
})

export class JoursOffComponent implements OnInit {
  @ViewChild('content') content: TemplateRef<any> | undefined;

  joursOffs: JoursOff[] = [];
  jo: any = {};
  typesJour: string[] = [];
  showForm: boolean = false;
  selectedEvent: JoursOff | null = null;
  editable: boolean = false;
  calendarOptions: CalendarOptions = {
    locale: frLocale,
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin
    ],

    headerToolbar: {
      left: 'prev,next,prevYear,nextYear,today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
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
    dateClick: this.handleDateClick.bind(this),
  };

  constructor(
    private _jourOffService: JoursOffService,
    private datePipe: DatePipe,
    private offcanvasService: NgbOffcanvas
  ) {
  }

  ngOnInit(): void {
    this._init();
  }

  reInitJourOff() {
    this.jo = {};
  }

  showPanel() {
    this.offcanvasService.open(this.content, {position: 'end'});
  }

  handleDateClick(clickInfo: DateClickArg) {
    const clickedDate = this.datePipe.transform(clickInfo.date, 'yyyy-MM-dd');
    console.log('Date séléctionnée :', clickedDate);

    const existedJourOff = this.joursOffs.find(jourOff => {
      const joDate = this.datePipe.transform(jourOff.jour, 'yyyy-MM-dd');
      return joDate === clickedDate;
    });

    this.jo.jour = clickedDate
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
    }

    this.showForm = true;
    this.showPanel();
  }

  createOrUpdateJourOff() {
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
