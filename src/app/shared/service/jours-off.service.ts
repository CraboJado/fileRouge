import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {JoursOff} from "../model/jours-off";
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class JoursOffService {

  private _baseUrl = environment.urlApi.joursoff;

  constructor(private _http: HttpClient) {
  }

  public findAll() {
    return this._http.get<JoursOff[]>(this._baseUrl)
  }

  public findById(id?: number) {
    return this._http.get(`${this._baseUrl}/${id}`);
  }

  public create(created: JoursOff) {
    return this._http.post(this._baseUrl, created);
  }

  public update(updated: JoursOff) {
      return this._http
        .put(`${this._baseUrl}/${updated.id}`, updated);
    }
 /* public update(updated: JoursOff) {
    return this._http
      .put(`${this._baseUrl}`, updated);
  }*/
  public delete(id?: number) {
    return this._http.delete(`${this._baseUrl}/${id}`);
  }
}
