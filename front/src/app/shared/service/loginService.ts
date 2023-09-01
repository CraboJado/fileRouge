import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Login} from "../model/login";
import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class LoginService{

  private _baseUrl = "http://localhost:8080/sessions";


  constructor(private http: HttpClient) {}


  public login(username:string,password:string){

    const logindata={
      email:username,
      password:password
    }


    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(logindata);


    return this.http.post(this._baseUrl, body,{'headers': headers})
      .subscribe((response)=> console.log(response));


  }



}
