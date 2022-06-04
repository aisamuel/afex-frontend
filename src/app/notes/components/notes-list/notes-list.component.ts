import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotesService } from '../../services/notes.service';
import { NgxSpinnerService } from "ngx-spinner";
import { HttpErrorResponse } from '@angular/common/http';
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
    // this.spinner.show();
    this.route.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.bankfinancialInstitutionId = params.get('id');
        this.fid = Number(params.get('fid'))
      }

    });
    this.getAllNotes(this.bankfinancialInstitutionId, this.startDate, this.endDate);
  }

  ngOnInit() {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addNew() {
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
          'Add Record Successfully...!!!',
          'bottom',
          'center'
        );
      }
    });
  }

  editCall(row) {
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
          'Edit Record Successfully...!!!',
          'bottom',
          'center'
        );
      }
    });
  }
  deleteItem(row) {

    const dialogRef = this.dialog.open(DeleteComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        
        this.refreshTable();
        this.showNotification(
          'snackbar-danger',
          'Delete Record Successfully...!!!',
          'bottom',
          'center'
        );
      }
    });
  }

  public getAllNotes(fid: any, startDate: string, endDate: string): void {
    this._notesService.getNotes(fid, startDate, endDate).subscribe(
      (res) => {
        this.loading = true;
        this.notes = res;
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

  refreshTable() {
    this.getAllNotes(this.bankfinancialInstitutionId, this.startDate, this.endDate);
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

}
