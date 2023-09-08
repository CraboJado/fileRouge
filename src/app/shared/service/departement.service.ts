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
    return this.http.get<Departement[]>(this._baseUrl,{withCredentials:true})
}


  public create(nom:string){

    const newDepartement={
      name:nom,

    }
    const head = { 'content-type': 'application/json'}
    const body=JSON.stringify(newDepartement);

    this.http.post<string>(this._baseUrl, body, { observe: "response", headers:head, withCredentials:true})
      .subscribe(response=> {
        console.log(response)
      })
  }
}
