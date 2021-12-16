import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const API_URL = environment.url;
const X_ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJ1c2VySWRcIjpcImRlYTUzZTIxLWMyMzgtNDc1ZS04ZmI5LWRjZjRkOTdjMDBhOFwiLFwicm9sZVwiOlwiZGV2ZWxvcGVyXCIsXCJuYW1lXCI6XCJtYW5pa2FudGFfZ21haWxcIixcImVtYWlsXCI6XCJwYXRuYW5hbWFuaWthbnRhOTZAZ21haWwuY29tXCJ9IiwiaWF0IjoxNjM5NjMxNzI3LCJleHAiOjE2NDAyMzY1Mjd9.Oupo5aAbeYOtO2lCSJPg96SS_pW5Sc8stiGRBWYh3x8';

export interface payloadEvent {
    currentPage?: number;
    perPage?: number;
}

@Injectable({
    providedIn: 'root'
})
export class BackendApiService {

    constructor(private http: HttpClient) { }

    // Get Event page Table data as required.
    getEventTable(data: payloadEvent) {
        const header = new HttpHeaders()
            .set('accept', '*/*')
            .set('x-access-token', X_ACCESS_TOKEN)
            .set('Content-Type', 'application/json');
        return this.http
            .post<any>(API_URL + '/api/risk-events', data, { headers: header })
            .pipe(
                map((response) => {
                    return response;
                })
            );
    }
}
