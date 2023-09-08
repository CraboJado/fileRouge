import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Login} from "../model/login";
import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class LoginService{

  private _baseUrl = "http://localhost:8080/sessions";


  constructor(private http: HttpClient) {}


  public loging(username:string,password:string){

    const logindata={
      email:username,
      password:password
    }
    const head = { 'content-type': 'application/json'}
    const body=JSON.stringify(logindata);

    this.http.post(this._baseUrl, body, { observe: "response", headers:head , withCredentials:true})
      .subscribe(response=> {
        console.log(response)
        console.log(response.headers)
      })

//   return this.http.post(this._baseUrl, body,{'headers': headers})
//       .subscribe((response)=> console.log(response));
//
}
}
