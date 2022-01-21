import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Giphy } from './giphy';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GiphyService {

  private readonly API_URL = 'assets/data/students.json';
  private readonly GIPHY_API_URL = `https://api.giphy.com/v1/gifs/search?api_key=${environment.giphy_api_key}`;
  dataChange: BehaviorSubject<Giphy> = new BehaviorSubject<Giphy>(null);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {}
  get data(): Giphy {
    return this.dataChange.value;
  }

  //Create body
  /** CRUD METHODS */
  searchGiphy(data: string): void {
    // console.log(this.GIPHY_API_URL + `&q=${data}`)
    const url = this.GIPHY_API_URL + `&q=${data}`
    this.httpClient.request<Giphy>('GET', url).subscribe(
      data => {
        // console.log(data)
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }

}
