import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { GiphyData } from '../../giphy';

@Component({
  selector: 'app-giphy-details',
  templateUrl: './giphy-details.component.html',
  styleUrls: ['./giphy-details.component.sass']
})
export class GiphyDetailsComponent {
  giphyData: GiphyData;
  constructor(
    public dialogRef: MatDialogRef<GiphyDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.giphyData = data.result
   }

  

}
