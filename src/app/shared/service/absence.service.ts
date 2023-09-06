import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Login} from "../model/login";
import {Departement} from "../model/departement";
import {Absence} from "../model/absence";

@Injectable({
  providedIn: 'root'
})
export class AbsenceService{

  private _baseUrl = "http://localhost:8080/absence";

  constructor(private _http: HttpClient) {}


  public findAll(){
    return this._http.get<Absence[]>(this._baseUrl)
  }

  public update(updated: Absence) {
    const headers = { 'content-type': 'application/json'}
    return  this._http
   .put<Absence>(`${this._baseUrl}/statut/${updated.id}`, updated,{'headers': headers}) 

  }

 
}
