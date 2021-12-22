import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { eventTableFilterPayload, screenEventTableFilterPayload } from '../models/tables-filters.model';

const API_URL = environment.url;
const X_ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJ1c2VySWRcIjpcImRlYTUzZTIxLWMyMzgtNDc1ZS04ZmI5LWRjZjRkOTdjMDBhOFwiLFwicm9sZVwiOlwiZGV2ZWxvcGVyXCIsXCJuYW1lXCI6XCJtYW5pa2FudGFfZ21haWxcIixcImVtYWlsXCI6XCJwYXRuYW5hbWFuaWthbnRhOTZAZ21haWwuY29tXCJ9IiwiaWF0IjoxNjM5NzE0MTIyLCJleHAiOjE2NDAzMTg5MjJ9.OXPBQ68ByqR4mUDEl7EjyFXgufOSL4y-HH-goyWmGOE';

// export interface payloadEvent {
//     currentPage?: number;
//     perPage?: number;
// }

@Injectable({
  providedIn: 'root'
})
export class BackendApiService {
  constructor(private http: HttpClient) { }

  // Get Event page Table data as required.
  getEventTable(data: eventTableFilterPayload, token: any) {
    const header = new HttpHeaders()
      .set('accept', '*/*')
      .set('x-access-token', token)
      .set('Content-Type', 'application/json');
    return this.http
      .post<any>(API_URL + '/api/risk-events', data, { headers: header })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getEventTableCSV(data: eventTableFilterPayload, token: any) {
    const header = new HttpHeaders()
      .set('accept', '*/*')
      .set('x-access-token', token)
      .set('Content-Type', 'application/json');
    return this.http
      .post<any>(API_URL + '/api/download-csv', data, { headers: header })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getScreenEventTable(data: screenEventTableFilterPayload, token: any) {
    const header = new HttpHeaders()
      .set('accept', '*/*')
      .set('x-access-token', token)
      .set('Content-Type', 'application/json');
    return this.http
      .post<any>(API_URL + '/api/screen/screen-listeners-events', data, { headers: header })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getRequestData(data: any) {
    const header = new HttpHeaders()
      .set('accept', 'application/json')
      .set('x-access-token', X_ACCESS_TOKEN)
      .set('Content-Type', 'application/json');
    return this.http
      .get<any>(API_URL + '/api/risk-events/' + data, { headers: header })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
