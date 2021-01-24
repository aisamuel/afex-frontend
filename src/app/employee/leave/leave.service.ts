import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Leave } from './leave';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  API_URL = environment.apiUrl;
  PROTOCOL = "http://"
  baseurl = this.API_URL;
  protocol = this.PROTOCOL;
  // private readonly API_URL = 'assets/data/professors.json';
  dataChange: BehaviorSubject<Leave[]> = new BehaviorSubject<Leave[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {}
  get data(): Leave[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }


 // getIpAddress(): Observable<Address[]> {
  //   const accessToken = AuthService.getAccessToken();
  //   const headers = new HttpHeaders({ Authorization: `Bearer ${accessToken}` });
  //   return this.http.get<Address[]>('http://localhost:8080/api/ip_address/', { headers })
  // }
   //Question
   getAllLeave(): void {
    const accessToken = AuthService.getAccessToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${accessToken}` });
    this.httpClient.get<Leave[]>(this.baseurl + '/api/list/leave/', {headers}).subscribe(
    // this.httpClient.get<Leave[]>('http://localhost:8080/api/list/leave/', {headers}).subscribe(
      // this.httpClient.get<Examination[]>(this.API_URL).subscribe(
      data => {
        this.dataChange.next(data);
        console.log(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }

  
  // DEMO ONLY, you can find working methods below
  updateLeave(leave: Leave): void {
    this.editLeave(leave);
    this.dialogData = leave;
  }
  deleteLeave(id: number): void {
    console.log(id);
    this.deleteLeaves(id);
  }
  


  addLeave(
    leave: Leave
  ): Observable<Leave> {
    const accessToken = AuthService.getAccessToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${accessToken}` });
    // const url = 'http://localhost:8080/api/create/leave/';
    const url = this.baseurl + '/api/create/leave/';
    const formData = new FormData();
    // formData.append('approved', leave.approved);
    // formData.append('employee', leave.employee);
    // formData.append('leave_date', leave.leave_date);
    formData.append('reason', leave.reason);
    return this.httpClient.request<Leave>('POST', url, {body: formData});
  }

  editLeave(
    leave: Leave
  ): Observable<Leave> {
    const accessToken = AuthService.getAccessToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${accessToken}` });
    const url = this.baseurl + '/api/edit/leave/' + leave.id + '/';
    const formData = new FormData();
    // formData.append('approved', leave.approved);
    // formData.append('employee', leave.employee);
    // formData.append('leave_date', leave.leave_date);
    formData.append('reason', leave.reason);
    return this.httpClient.request<Leave>('PUT', url, {body: formData});
  }

  deleteLeaves(
    id: any
  ): void {
    console.log("deleted");
    const accessToken = AuthService.getAccessToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${accessToken}` });
    this.httpClient.delete<Leave>(this.baseurl + '/api/edit/leave/' + id + '/', {headers}).subscribe(
      data => {
        console.log(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }
}
