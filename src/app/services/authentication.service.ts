import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

const API_URL = environment.url;

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    userSubject = new BehaviorSubject<User | null>(null);
    user = new Observable<User | null>();

    constructor(
        private router: Router,
        private http: HttpClient,
    ) {
        if (sessionStorage.getItem('user')) {
            this.userSubject.next(JSON.parse(sessionStorage.getItem('user') as string));
            // this.userSubject = new BehaviorSubject<User | null>(JSON.parse(sessionStorage.getItem('user') as string));
        }
        else {
            this.userSubject.next(JSON.parse(localStorage.getItem('user') as string));
            // this.userSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('user') as string));
        }

        this.user = this.userSubject.asObservable();
    }

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
                    localStorage.removeItem('user');
                    sessionStorage.removeItem('user');
                    localStorage.setItem('user', JSON.stringify(user));
                    sessionStorage.setItem('user', JSON.stringify(user));
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
        sessionStorage.removeItem('user');
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/login']);
    }
}