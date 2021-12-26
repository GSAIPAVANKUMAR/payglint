import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
  eventTableFilterPayload,
  screenEventTableFilterPayload,
  auditTrailTableFilterPayload,
} from '../models/tables-filters.model';

const API_URL = environment.url;

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

  getAuditTrailTable(data: auditTrailTableFilterPayload, token: any) {
    const header = new HttpHeaders()
      .set('accept', '*/*')
      .set('x-access-token', token)
      .set('Content-Type', 'application/json');
    return this.http
      .post<any>(API_URL + '/api/audit/audit-trails', data, { headers: header })
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

  getRequestData(data: any, token: any) {
    const header = new HttpHeaders()
      .set('accept', 'application/json')
      .set('x-access-token', token)
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
