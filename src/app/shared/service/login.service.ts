import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from 'src/environments/environment';
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private _baseUrl = environment.urlApi.login;

  constructor(private http: HttpClient, private router:Router) {
  }

  public login(username: string, password: string) {


    const logindata = {
      email: username,
      password: password
    }
    const headers = { 'content-type': 'application/json'}
    const body = JSON.stringify(logindata);

    this.http.post(this._baseUrl, body, {observe: "response", headers: headers, withCredentials: true})
      .subscribe(
        {
          next:t=> this.router.navigate(['/home']) ,
          error:t=>t
        }

    )
  }
//   return this.http.post(this._baseUrl, body,{'headers': headers})
//       .subscribe((response)=> console.log(response));
//
}
