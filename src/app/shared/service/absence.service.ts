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


  constructor(private http: HttpClient) {}


  public findAll(){
    return this.http.get<Absence[]>(this._baseUrl)
  }

  public create(absence: Absence) {
    return this.http.post<Absence>(this._baseUrl, absence)
  }

  public delete(id: string) {
    return this.http
      .delete<Absence>(this._baseUrl + "/" + id)

  }

  public update(absence: Absence) {
    return this.http.put<Absence>(this._baseUrl + "/" +  absence.id, absence)
  }

}
