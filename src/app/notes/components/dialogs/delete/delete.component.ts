import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { NotesService } from '../../../services/notes.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.sass']
})
export class DeleteComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public notesService: NotesService,
    private spinner: NgxSpinnerService,
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.spinner.show();
    this.notesService.deleteNote(this.data.id).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.dialogRef.close(1);
      },
      (error: HttpErrorResponse) => {
        console.log(error)
      }
    );;
  }
}
