import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

const API_URL = environment.url;

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    userSubject = new BehaviorSubject<User | null>(null);

    constructor(
        private router: Router,
        private http: HttpClient,
    ) { }

    public get userValue(): User | null {
        return this.userSubject?.value;
    }

    login(data: any) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'accept': '*/*'
            })
        }
        return this.http
            .post<any>(API_URL + '/api/auth/login', data, httpOptions)
            .pipe(
                map((user) => {
                    this.handleAuthentication(user?.token, user?.message);
                    return user;
                })
            );
    }

    handleAuthentication(token: string, message: string | null) {
        const user = new User(token, message);
        this.userSubject.next(user);
    }

    logout() {
    }
}