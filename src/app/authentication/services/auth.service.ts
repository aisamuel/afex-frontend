import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { environment } from 'src/environments/environment';
import { Login, Register } from '../models/authentication';
// import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    // private cookieService: CookieService,

  ) { }

  login(payload: Login): Observable<any> {
    const endpoint =
      environment.endPoint + `user/login`;
    return this.httpClient.post<any>(endpoint, payload);
  }

  register(payload: Register): Observable<any> {
    const endpoint =
      environment.endPoint + `user`;
    return this.httpClient.post<any>(endpoint, payload);
  }

  // private hasToken() : boolean {
  //   // return this.cookieService.check('currentUser');
  // }
}
