import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { environment } from 'src/environments/environment';
import { CreateNote, Note } from '../models/note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  public getNotes(startDate: string, endDate: string): Observable<Note[]> {
    // const endpoint = `?startDate=${startDate}&endDate=${endDate}&instructedInstitutionCode=${fid}&successStatus=success`;
    const endpoint =
      environment.endPoint + `note/`;
    return this.httpClient.get<Note[]>(endpoint, { withCredentials: true });
  }

  public addNote(payload: CreateNote): Observable<any> {
    console.log(payload)
    const endpoint =
      environment.endPoint + `note/`;
    return this.httpClient.post<any>(endpoint, payload, { withCredentials: true });
  }

  public editNote(payload: CreateNote, note_id: number): Observable<any> {
    const endpoint =
      environment.endPoint + `note/${note_id}`;
    return this.httpClient.put<any>(endpoint, payload, { withCredentials: true });
  }

  public deleteNote(note_id: number): Observable<any> {
    const endpoint =
      environment.endPoint + `note/${note_id}`;
    return this.httpClient.delete<any>(endpoint, { withCredentials: true });
  }

}
