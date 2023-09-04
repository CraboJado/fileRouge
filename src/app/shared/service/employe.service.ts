import { HttpClient } from "@angular/common/http";
import { Employe } from "../model/employe";
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  private _baseUrl = environment.urlApi.employes;


  constructor(private http: HttpClient) { }

  public findAll() {
    return this.http.get<Employe[]>(this._baseUrl);
  }

  public findById() {
    return this.http.get<Employe>(this._baseUrl)
  }

}
