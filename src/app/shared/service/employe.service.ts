import {HttpClient} from "@angular/common/http";
import {Employe} from "../model/employe";
import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class EmployeService{

  private _baseUrl = "http://localhost:8080/employe";


  constructor(private http: HttpClient) {}

  public findAll() {
    return this.http.get<Employe[]>(this._baseUrl);
  }

  public findById(){
    let thiduedyes="bonjour";
    return this.http.get<Employe>(this._baseUrl)
   }

}
