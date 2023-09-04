import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Login } from "../model/login";
import { Departement } from "../model/departement";
import { JoursOff } from "../model/jours-off";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class JoursOffService {

  private _baseUrl = environment.urlApi.joursoff;

  constructor(private http: HttpClient) { }


  public findAll() {
    return this.http.get<JoursOff[]>(this._baseUrl)
  }


}
