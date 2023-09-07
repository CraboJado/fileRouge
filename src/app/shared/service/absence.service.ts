import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Login} from "../model/login";
import {Departement} from "../model/departement";
import {Absence} from "../model/absence";
import {Employe} from "../model/employe";

@Injectable({
  providedIn: 'root'
})
export class AbsenceService{

  private _baseUrl = "http://localhost:8080/absence";

  constructor(private _http: HttpClient) {}


  public findAll(){
    return this._http.get<Absence[]>(this._baseUrl,{withCredentials:true})
  }

  public update(updated: Absence) {

    const newAbsence={
      dateCreation:updated.dateCreation,
      dateDebut:updated.dateDebut,
      dateFin:updated.dateFin,
      motif:updated.motif,
      typeAbsence:updated.typeAbsence,
      statut:updated.statut,
      employeId:updated.employe?.id
    }
    const headers = { 'content-type': 'application/json'}
    return  this._http
   .put(`${this._baseUrl}/statut/${updated.id}`, newAbsence,{headers: headers,withCredentials:true})

  }
  public create(updated: Absence) {

    const newAbsence={
      dateCreation:updated.dateCreation,
      dateDebut:updated.dateDebut,
      dateFin:updated.dateFin,
      motif:updated.motif,
      typeAbsence:updated.typeAbsence,
      statut:updated.statut,
      employeId:updated.employe?.id
    }
    const headers = { 'content-type': 'application/json'}
    return  this._http
   .post(`${this._baseUrl}/statut/${updated.id}`, newAbsence,{headers: headers,withCredentials:true})

  }





}
