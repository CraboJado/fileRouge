import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Login} from "../model/login";
import {Departement} from "../model/departement";
import {JoursOff} from "../model/joursOff";

@Injectable({
  providedIn: 'root'
})
export class JoursOffService{

  private _baseUrl = "http://localhost:8080/jouroff";


  constructor(private http: HttpClient) {}


  public findAll(){
    return this.http.get<JoursOff[]>(this._baseUrl)
  }


}
