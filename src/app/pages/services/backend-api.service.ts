import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { eventTableFilterPayload, screenEventTableFilterPayload } from '../models/tables-filters.model';

const API_URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class BackendApiService {
  token: any;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'accept': '*/*'
    })
  }
  constructor(private http: HttpClient) { }

  // Get Event page Table data as required.
  getEventTable(data: eventTableFilterPayload) {
    const header = new HttpHeaders()
      .set('accept', '*/*')
      .set('x-access-token', this.token)
      .set('Content-Type', 'application/json');
    return this.http
      .post<any>(API_URL + '/api/risk-events', data, { headers: header })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getScreenEventTable(data: screenEventTableFilterPayload) {
    const header = new HttpHeaders()
      .set('accept', '*/*')
      .set('x-access-token', this.token)
      .set('Content-Type', 'application/json');
    return this.http
      .post<any>(API_URL + '/api/screen/screen-listeners-events', data, { headers: header })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  login(data: any) {
    return this.http
      .post<any>(API_URL + '/api/auth/login', data, this.httpOptions)
      .pipe(
        map((response) => {
          this.token = response.token;
          return response;
        })
      );
  }
}
