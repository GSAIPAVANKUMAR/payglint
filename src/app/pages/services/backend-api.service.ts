import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const API_URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  
  // Get Event page Table data as required.
  getEventTable(data: any) {
    return this.http
      .post<any>(API_URL + '/api/risk-events', data, this.httpOptions)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
