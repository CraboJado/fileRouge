import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Login } from "../model/login";
import { Departement } from "../model/departement";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {

  private _baseUrl = environment.urlApi.departements;

  constructor(private http: HttpClient) { }


  public findAll() {
    return this.http.get<Departement[]>(this._baseUrl)
  }


}
