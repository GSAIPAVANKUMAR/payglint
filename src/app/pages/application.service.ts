import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

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

  getAllServer(){
   return this.http.get(environment.url + '/servers/getAllServers/',this.httpOptions);
  }

  addServer(data:any){
    return this.http.post(environment.url + '/servers/addServer/' , data,this.httpOptions);
  }

  deleteServer(id:any){
    return this.http.delete(environment.url + '/servers/deleteServer/'+ id,this.httpOptions);
  }

  updateServer(data:any){
    return this.http.put(environment.url + '/servers/updateServer/',data,this.httpOptions);
  }

  exportServer(){
    return this.http.get(environment.url + '/servers/exportToCSV/',this.httpOptions);
  }
}
