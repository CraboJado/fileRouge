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
  errorMessage: string = '';
  okMessage: string = "";

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
  }
  rejectStatut(absence: Absence) {
    absence.statut = "REJETEE"
  }
  eraseStatut(absence: Absence) {
    absence.statut = "INITIALE"
  }

  clearMessages() {
    setTimeout(() => {
      this.okMessage = '';
      this.errorMessage = '';
    }, 3000); 
  }


  updateAbs() {
    const isTreated = this.absences.every(absence => {
      return absence.statut === 'VALIDEE' || absence.statut === 'REJETEE';
    });
    if (isTreated) {
      this.absences.forEach(absence => {
        this._absenceService.update(absence).subscribe(() => {
          this._init()
        });
        this.okMessage = "Toutes les absences ont bien été envoyées.";
        this.clearMessages();
      });
    } else {
      this.errorMessage = "Toutes les absences doivent être traitées pour être envoyées.";
      this.clearMessages();
    }
  }
}



