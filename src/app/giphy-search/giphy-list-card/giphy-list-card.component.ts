import { Component, Input, OnInit } from '@angular/core';
import { Giphy, GiphyData } from '../giphy';
import { MatDialog } from '@angular/material/dialog';
import { GiphyDetailsComponent } from '../dialog/giphy-details/giphy-details.component';
declare const $: any;
@Component({
  selector: 'app-giphy-list-card',
  templateUrl: './giphy-list-card.component.html',
  styleUrls: ['./giphy-list-card.component.sass']
})
export class GiphyListCardComponent implements OnInit {
  @Input() results: GiphyData[];
  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }
  

  public details(result: GiphyData): void {
    const dialogRef = this.dialog.open(GiphyDetailsComponent, {
      data: {
        result: result,
        action: 'details',
      },
    });
  }

}
