import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private _baseUrl = environment.urlApi.login;

  constructor(private http: HttpClient) {
  }

  public login(username: string, password: string) {


    const logindata = {
      email: username,
      password: password
    }
    const headers = { 'content-type': 'application/json'}
    const body = JSON.stringify(logindata);

    this.http.post(this._baseUrl, body, {observe: "response", headers: headers, withCredentials: true})
      .subscribe(response => {
        console.log(response)
        console.log(response.headers)
      })
  }
//   return this.http.post(this._baseUrl, body,{'headers': headers})
//       .subscribe((response)=> console.log(response));
//
}
