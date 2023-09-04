import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Login} from "../model/login";
import {Departement} from "../model/departement";
import {Absence} from "../model/absence";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AbsenceService{

  private _baseUrl = environment.urlApi.absences;

  constructor(private http: HttpClient) {}


  public findAll(){
    return this.http.get<Absence[]>(this._baseUrl)
  }


}
