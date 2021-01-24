import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, share } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  group: string;
  photo: string;
}

export const createUser = (data: any): User => {
  return {
    id: data.id,
    username: data.username,
    first_name: data.first_name,
    last_name: data.last_name,
    group: data.group,
    photo: data.photo,
  };
};

export interface Token {
  access: string;
  refresh: string;
}

// id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
//     employee = models.ForeignKey(User, related_name='employee', on_delete=models.CASCADE)
//     reason = models.TextField()
//     approved = models.BooleanField(default=False)
//     leave_date = models.DateField()

export interface Address {
  pub_date: any;
  ip_address: any;
}

export interface Leave {
  id: any;
  employee: any;
  reason: any;
  approved: any;
  leave_date: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  static getUser(): User {
    const accessToken = this.getAccessToken();
    if (accessToken) {
      return this.parseUserFromAccessToken(accessToken);
    }
    return undefined;
  }

  static getAccessToken(): string {
    const token = JSON.parse(window.localStorage.getItem('leave.auth'));
    if (token) {
      return token.access;
    }
    return undefined;
  }

  static isRider(): boolean {
    const user = this.getUser();
    if (user) {
      return user.group === 'employee';
    }
    return false;
  }

  static isDriver(): boolean {
    const user = this.getUser();
    if (user) {
      return user.group === 'admin';
    }
    return false;
  }

  private static parseUserFromAccessToken(accessToken: string): User {
    const [, payload, ] = accessToken.split('.');
    const decoded = window.atob(payload);
    return JSON.parse(decoded);
  }

  signUp(
    username: string,
    firstName: string,
    lastName: string,
    password: string,
    group: string,
    photo: any
  ): Observable<User> {
    const url = 'https://interviewdjangoapp.herokuapp.com/api/sign_up/';
    const formData = new FormData();
    formData.append('username', username);
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('password1', password);
    formData.append('password2', password);
    formData.append('group', group);
    // formData.append('photo', photo);
    return this.http.request<User>('POST', url, { body: formData });
  }

  logIn(username: string, password: string): Observable<Token> {
    const url = 'https://interviewdjangoapp.herokuapp.com/api/log_in/';
    return this.http.post<Token>(url, { username, password }).pipe(
      tap(token => localStorage.setItem('leave.auth', JSON.stringify(token)))
    );
  }

  logOut(): void {
    localStorage.removeItem('leave.auth');
  }

  getIpAddress(): Observable<Address[]> {
    const accessToken = AuthService.getAccessToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${accessToken}` });
    return this.http.get<Address[]>('https://interviewdjangoapp.herokuapp.com/api/ip_address/', { headers })
  }

  getLeave(): Observable<Leave[]> {
    const accessToken = AuthService.getAccessToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${accessToken}` });
    return this.http.get<Leave[]>('/api/create/leave/', { headers })
  }

  // id: any;
  // employee: any;
  // reason: any;
  // approved: any;
  // leave_date: any;

  createLeave(
    employee: any,
    reason: any,
    leave_date: any,
    
  ): Observable<User> {
    const url = '/api/create/leave/';
    const formData = new FormData();
    formData.append('employee', employee);
    formData.append('reason', reason);
    formData.append('leave_date', leave_date);
    // formData.append('photo', photo);
    return this.http.request<User>('POST', url, { body: formData });
  }
}
