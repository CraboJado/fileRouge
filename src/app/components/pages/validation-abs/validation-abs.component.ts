import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Absence } from 'src/app/shared/model/absence';
import { AbsenceService } from 'src/app/shared/service/absence.service';
@Component({
  selector: 'app-validation-abs',
  templateUrl: './validation-abs.component.html',
  styleUrls: ['./validation-abs.component.css']
})
export class ValidationAbsComponent {
  absences: Absence[] = [];
  // isActive: boolean = false;



  constructor(private _absenceService: AbsenceService) { }

  ngOnInit(): void {
    this._init()
  }

  private _init() {
    this._absenceService
      .findAll()
      .subscribe(absenceReceived => {
        this.absences = absenceReceived;
        
      })
      
  }


  validStatut(absence: Absence) {
    absence.statut = "VALIDEE";
    this._absenceService
      .update(absence)
      .subscribe(() => this._init)
  }


  rejectStatut(absence: Absence) {
    absence.statut = "REJETEE"
  
    this._absenceService
      .update(absence)
      .subscribe(() => this._init)
  }
  
}

