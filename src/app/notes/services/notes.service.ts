import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
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

  public getNotes(fid: any, startDate: string, endDate: string): Observable<Note[]> {
    // const httpOptions: Object = {
    //   headers: new HttpHeaders({
    //     'Accept': 'text/html',
    //     'Content-Type': 'text/plain; charset=utf-8',
    //     'key': '2os5C0TTSz4D9GgvqRmlEG3eVnVaOEKI'
    //   }),
    // };
    // const endpoint = `?startDate=${startDate}&endDate=${endDate}&instructedInstitutionCode=${fid}&successStatus=success`;
    const endpoint =
      environment.endPoint + `note/`;
    return this.httpClient.get<Note[]>(endpoint);
  }

  public addNote(payload: CreateNote): Observable<any> {
    const endpoint =
      environment.endPoint + `note`;
    return this.httpClient.post<any>(endpoint, payload);
  }

  public editNote(payload: CreateNote, note_id: number): Observable<any> {
    const endpoint =
      environment.endPoint + `note/${note_id}`;
    return this.httpClient.put<any>(endpoint, payload);
  }

  public deleteNote(note_id: number): Observable<any> {
    const endpoint =
      environment.endPoint + `note/${note_id}`;
    return this.httpClient.delete<any>(endpoint);
  }

}
