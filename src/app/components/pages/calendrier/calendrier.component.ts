import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { Calendar,CalendarOptions, DateInput,EventSourceInput} from '@fullcalendar/core';
import frLocale from '@fullcalendar/core/locales/fr';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Absence } from 'src/app/shared/model/absence';
import { AbsenceService } from 'src/app/shared/service/absence.service';
import {DatePipe} from "@angular/common";
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
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
    locale: frLocale,
    plugins: [dayGridPlugin, interactionPlugin, bootstrap5Plugin],
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    events: [],
    themeSystem: 'bootstrap5',
    weekends:false,
  }

  constructor(private _absenceService: AbsenceService,private _datePipe: DatePipe) {}

  ngOnInit(): void {
    this._init();
  }

  private _init() {
    this._absenceService.findAllByEmploye().subscribe((absencesReceived) => {
      this.absences = absencesReceived;
      this.calendarOptions.events = this.absences.map((abs) => {
        let color = '#ffd2e1';
        if (abs.statut == 'EN_ATTENTE') color = '#2B1B7B';
        if (abs.statut == 'VALIDEE' && abs.typeAbsence =='RTT') color = '#FEDD00';
        if (abs.statut == 'VALIDEE' && abs.typeAbsence =='CONGE_PAYE') color = '#35FDBE';
        if (abs.statut == 'REJETEE') color = '#f00020';

        const id:string = abs.id+'';

        let dateFin = abs.dateDebut as DateInput;

        if(abs.dateFin != abs.dateDebut){
          let endDate = new Date(abs.dateFin as Date)
          endDate.setDate(endDate.getDate() + 1)
          dateFin = this._datePipe.transform(endDate, 'yyyy-MM-dd') as DateInput ;
        }

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
      console.log(this.calendarOptions.events)
    });
  }

  handleEventClick(info:any){
    info.jsEvent.preventDefault();
    console.log('affecter valeur à event')
    this.event = info.event;

  }

  handleDateClick(arg: any) {
    console.log('date click function')
    console.log("event.id === ",this.event.id)
    if(this.event.id){
      console.log("update or delete, showButton")
      this.showButton = !this.showButton
    }else{
      console.log("No event, show Form to creer")
      this.showForm = !this.showForm;
    }
  }

  handleShowForm(){
    this.showForm = !this.showForm;
    this.showButton = !this.showButton;
  }


 handleAnnulation(){
    console.log("turn off Form, re-initial the state as beginning : isDelete false, event = {}")
   this.showForm = !this.showForm;
   if(this.event.id && this.isDelete){
     this.isDelete = false;
   }
   this.event = {};
 }

  annulerDemandeAbs(){
    console.log("set isDelete true, show Form and hide button")
    this.isDelete = true;
    this.showForm = !this.showForm;
    this.showButton = !this.showButton;

  }


  handleSubmit(data:any){
    // ajoute une absence
    if(!this.event.id){
      console.log('creer absence, turnoff form')
      const absence = {
        dateDebut:data.value.start,
        dateFin:data.value.end,
        typeAbsence:data.value.type,
        motif:data.value.motif,
        employeId:1,
        statut:"INITIALE"
      }
      //TODO à regler le problem de error , mais code 201 dans la réponse,
      this._absenceService.create(absence).subscribe({
        next: ()=> { console.log('creer')},
        error :()=>{ this._init() },
        complete : ()=> console.log("complete")
      })


      this.showForm = !this.showForm;
      this.event = {};
      return
    }

    // annuler une absence
    //TODO à regler le problem de error , mais code 201 dans la réponse,
    if(this.isDelete){
      this._absenceService.delete(this.event.id)
        .subscribe({
          next:()=>{ },
          error:()=>{this._init()}
        })
      this.showForm = !this.showForm;
      this.event = {};
      this.isDelete = false;
      return
    }

    // modifier une absence
    const absence = {
      id:this.event.id,
      dateDebut:data.value.start,
      dateFin:data.value.end,
      typeAbsence:data.value.type,
      motif:data.value.motif,
      statut:"INITIALE"
    }

    //TODO à regler le problem de error , mais code 201 dans la réponse,
    this._absenceService.modify(absence).subscribe(
      {
        next:()=>{},
        error:()=> {this._init() }
      }
    )

    this.showForm = !this.showForm;
    this.event = {};
  }

}
