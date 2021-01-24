import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Address } from './address';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AddressService {

  API_URL = environment.apiUrl;
  PROTOCOL = "http://"
  baseurl = this.API_URL;
  protocol = this.PROTOCOL;
  // private readonly API_URL = 'assets/data/professors.json';
  dataChange: BehaviorSubject<Address[]> = new BehaviorSubject<Address[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {}
  get data(): Address[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }

  // path("create-answer/", AnswerCreateView.as_view()),
  // path("edit-answer/<pk>/", AnswerEditView.as_view()),
  // path("create-quiz/", QuizCreateView.as_view()),
	// path("edit-quiz/<pk>/", QuizEditView.as_view()),
	// path("create-question/", QuestionCreateView.as_view()),
	// path("edit-question/<pk>/", QuestionEditView.as_view()),
	// path("create-answer/", AnswerCreateView.as_view()),
	// path("edit-answer/<pk>/", AnswerEditView.as_view()),
  // getIpAddress(): Observable<Address[]> {
  //   const accessToken = AuthService.getAccessToken();
  //   const headers = new HttpHeaders({ Authorization: `Bearer ${accessToken}` });
  //   return this.http.get<Address[]>('http://localhost:8080/api/ip_address/', { headers })
  // }

   //Question
   getAllAddress(): void {
    const accessToken = AuthService.getAccessToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${accessToken}` });
    // this.httpClient.get<Address[]>(this.baseurl + '/api_resources/create/department/').subscribe(
    this.httpClient.get<Address[]>('http://localhost:8080/api/ip_address/', { headers }).subscribe(
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

  
  
  


  
}
