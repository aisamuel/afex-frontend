import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotesService } from '../../services/notes.service';
import { NgxSpinnerService } from "ngx-spinner";
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Note } from '../../models/note';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeleteComponent } from '../dialogs/delete/delete.component';
import { FormDialogComponent } from '../dialogs/form-dialog/form-dialog.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit, AfterViewInit {

  public notes!: Note[];
  bankfinancialInstitutionId: any = 232;
  fid: number;
  bank_name: string;
  searchparam: string = "";
  startDate: string = "2021-02-19";
  endDate: string = "2021-02-30";
  currency: string = "NGN";
  displayedColumns: string[] = ['id', 'title', 'content', 'user',  'created', 'updated', 'actions'];
  dataSource = new MatTableDataSource<Note>(this.notes);
  public loading: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  constructor(
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    public _notesService: NotesService
  ) {
    this.getAllNotes(this.bankfinancialInstitutionId, this.startDate, this.endDate);
  }

  ngOnInit() {

  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public addNew(): void {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        note: null,
        action: 'add',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataServicex
        this.refreshTable();
        this.showNotification(
          'snackbar-success',
          'Add Note Successfully...!!!',
          'bottom',
          'center'
        );
      }
    });
  }

  public editCall(row): void {
    console.log(row)
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        note: row,
        action: 'edit',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        
        this.refreshTable();
        this.showNotification(
          'black',
          'Edit Note Successfully...!!!',
          'bottom',
          'center'
        );
      }
    });
  }
  public deleteItem(row): void {

    const dialogRef = this.dialog.open(DeleteComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        
        this.refreshTable();
        this.showNotification(
          'snackbar-danger',
          'Delete Note Successfully...!!!',
          'bottom',
          'center'
        );
      }
    });
  }

  private getAllNotes(fid: any, startDate: string, endDate: string): void {
    this.spinner.show();
    this._notesService.getNotes(fid, startDate, endDate).subscribe(
      (res: any) => {
        console.log(res)
        this.loading = true;
        this.notes = res.data;
        this.dataSource = new MatTableDataSource<Note>(this.notes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.spinner.hide();
        // this.spinner.hide();
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        this.spinner.hide();
      }
    );
  }

  public refreshTable(): void {
    this.getAllNotes(this.bankfinancialInstitutionId, this.startDate, this.endDate);
  }

  private showNotification(colorName, text, placementFrom, placementAlign): void {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

}
