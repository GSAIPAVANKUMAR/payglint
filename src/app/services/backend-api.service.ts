import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
  eventTableFilterPayload,
  screenEventTableFilterPayload,
  auditTrailTableFilterPayload,
  profileFilterPayload,
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

  getAuditTrailResourceFilterOptions(token: any) {
    const header = new HttpHeaders()
      .set('accept', 'application/json')
      .set('x-access-token', token)
      .set('Content-Type', 'application/json');
    return this.http
      .get<any>(API_URL + '/api/audit/audit-trails-resources', { headers: header })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getAuditTrailUserFilterOptions(token: any) {
    const header = new HttpHeaders()
      .set('accept', 'application/json')
      .set('x-access-token', token)
      .set('Content-Type', 'application/json');
    return this.http
      .get<any>(API_URL + '/api/audit/audit-trails-usernames', { headers: header })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getProfileTable(data: profileFilterPayload, token: any) {
    const header = new HttpHeaders()
      .set('accept', '*/*')
      .set('x-access-token', token)
      .set('Content-Type', 'application/json');
    return this.http
      .post<any>(API_URL + '/api/users/get', data, { headers: header })
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

  //Make service API call to get the saved filter data from DB.
  getSavedFilterData(data: any, token: any) {
    const header = new HttpHeaders()
      .set('accept', '*/*')
      .set('x-access-token', token)
      .set('Content-Type', 'application/json');
    return this.http
      .get<any>(API_URL + '/api/my/event/filters', { headers: header })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  //Make service API call to save the filter data into DB.
  saveFilterData(data: any, token: any) {
    const header = new HttpHeaders()
      .set('accept', '*/*')
      .set('x-access-token', token)
      .set('Content-Type', 'application/json');
    return this.http
      .put<any>(API_URL + '/api/my/event/filters', data, { headers: header })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
