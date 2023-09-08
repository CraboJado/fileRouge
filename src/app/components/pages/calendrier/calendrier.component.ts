import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import {
  Calendar,
  CalendarOptions, DateInput,
  EventSourceInput,
} from '@fullcalendar/core';
import frLocale from '@fullcalendar/core/locales/fr';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Absence } from 'src/app/shared/model/absence';
import { AbsenceService } from 'src/app/shared/service/absence.service';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-departements',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.css'],
})
export class CalendrierComponent implements OnInit {

  @ViewChild('fullcalendar') calendarComponent!: FullCalendarComponent;

  showForm = false;
  showButton = false;
  isDelete:boolean = false;
  absences: Absence[] = [];
  event:any = {}

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    events: [],
    weekends:false,

  }
  constructor(private _absenceService: AbsenceService,private _datePipe: DatePipe) {}

  ngOnInit(): void {
    this._init();
  }

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

        let endDate = new Date(abs.dateFin as Date)
        endDate.setDate(endDate.getDate() + 1)
        let dateFin = this._datePipe.transform(endDate, 'yyyy-MM-dd') as DateInput ;

        return {
          id: id,
          start:abs.dateDebut,
          end: dateFin ,
          type:abs.typeAbsence,
          motif:abs.motif,
          display: 'background',
          color: color
        };
      });
    });
  }

  handleEventClick(info:any){
    info.jsEvent.preventDefault();
    console.log('affecter valeur à event')
    this.event = info.event;

  }

  handleDateClick(arg: any) {
    console.log('date click function')
    console.log(this.event.id)
    if(this.event.id){
      console.log("update or delete")
      this.showButton = !this.showButton

    }else{
      this.showForm = !this.showForm;
      console.log("creer")
    }

  }

  handleShowForm(){
    this.showForm = !this.showForm;
    this.showButton = !this.showButton;
  }


 handleAnnulation(){
   this.showForm = !this.showForm;
   if(this.event.id && this.isDelete){
     this.isDelete = false;
   }

   this.event = {};
 }

  annulerDemandeAbs(){
    this.isDelete = true;
    this.showForm = !this.showForm;
    this.showButton = !this.showButton;

  }


  handleSubmit(data:any){
    // ajoute une absence
    if(!this.event.id){

      const absence = {
        dateDebut:data.value.start,
        dateFin:data.value.end,
        typeAbsence:data.value.type,
        motif:data.value.motif,
        employeId:1,
        statut:"INITIALE"
      }
      this._absenceService.create(absence).subscribe(()=> {
        this._init();
        console.log('absence creé')
      })
      this.showForm = !this.showForm;
      this.event = {};
      return
    }

    // annuler une absence
    if(this.isDelete){
      this._absenceService.delete(this.event.id)
        .subscribe(()=>{
          this._init();
          console.log('absence supprimé')
        })
      this.showForm = !this.showForm;
      this.event = {};
      this.isDelete = false;
      return
    }

    // modifier une absence

    // this._absenceService.update()
    console.log('modifier une demande absence dans bbd')
    this.showForm = !this.showForm;
    this.event = {};
  }

}
