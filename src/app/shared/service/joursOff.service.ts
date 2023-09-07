import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Login} from "../model/login";
import {Departement} from "../model/departement";
import {JoursOff} from "../model/joursOff";
import {Absence} from "../model/absence";

@Injectable({
  providedIn: 'root'
})
export class JoursOffService{

  private _baseUrl = "http://localhost:8080/jouroff";


  constructor(private http: HttpClient) {}


  public findAll(){
    return this.http.get<JoursOff[]>(this._baseUrl,{withCredentials:true})
  }


  public update(updated: JoursOff) {
    const newJourOff={
      jour:updated.jour,
      typeJour:updated.typeJour,
      description:updated.description
    }
    const headers = { 'content-type': 'application/json'}
    return  this.http
      .put(`${this._baseUrl}/jouroff/${updated.id}`, newJourOff,{headers: headers,withCredentials:true})
  }



  public create(jour:string,typeJour:string,description:string){
    const newJourOff={
      jour:jour,
      typeJour:typeJour,
      description:description
    }

    const headers = { 'content-type': 'application/json'}
    return  this.http
      .post(`${this._baseUrl}/jouroff`, newJourOff,{headers: headers,withCredentials:true})


  }


}
