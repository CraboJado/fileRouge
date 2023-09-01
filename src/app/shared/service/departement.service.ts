import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Login} from "../model/login";
import {Departement} from "../model/departement";

@Injectable({
  providedIn: 'root'
})
export class DepartementService{

  private _baseUrl = "http://localhost:8080/departement";


  constructor(private http: HttpClient) {}


public findAll(){
    return this.http.get<Departement[]>(this._baseUrl)
}


}
