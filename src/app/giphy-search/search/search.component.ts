import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GiphyService } from '../giphy.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Giphy, GiphyData } from '../giphy';
import { DataSource } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import { FormDialogComponent } from './dialogs/form-dialog/form-dialog.component';
// import { DeleteComponent } from './dialogs/delete/delete.component';
import { MatMenuTrigger } from '@angular/material/menu';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  
  selection = new SelectionModel<Giphy>(true, []);
  id: number;
  results: GiphyData[] = [];
  patients: Giphy | null;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public giphyService: GiphyService,
    private snackBar: MatSnackBar
  ) { }
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };

  ngOnInit() {
  }
 
  onKey(event: any) { // without type info
    this.giphyService.searchGiphy(event.target.value)
    this.results = this.giphyService.data.data
    console.log(this.results)
    // this.values += event.target.value + ' | ';
  }
  addNew() {
    console.log("pass")
    // const dialogRef = this.dialog.open(FormDialogComponent, {
    //   data: {
    //     patients: this.patients,
    //     action: 'add',
    //   },
    // });
    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result === 1) {
    //     // After dialog is closed we're doing frontend updates
    //     // For add we're just pushing a new row inside DataServicex
    //     this.exampleDatabase.dataChange.value.unshift(
    //       this.patientsService.getDialogData()
    //     );
    //     this.refreshTable();
    //     this.showNotification(
    //       'snackbar-success',
    //       'Add Record Successfully...!!!',
    //       'bottom',
    //       'center'
    //     );
    //   }
    // });
  }
  editCall(row) {
    console.log("pass")
    // this.id = row.id;
    // console.log(row)
    // const dialogRef = this.dialog.open(FormDialogComponent, {
    //   data: {
    //     patients: row,
    //     action: 'edit',
    //   },
    // });
    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result === 1) {
    //     // When using an edit things are little different, firstly we find record inside DataService by id
    //     const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
    //       (x) => x.id === this.id
    //     );
    //     // Then you update that record using data from dialogData (values you enetered)
    //     this.exampleDatabase.dataChange.value[
    //       foundIndex
    //     ] = this.patientsService.getDialogData();
    //     // And lastly refresh table
    //     this.refreshTable();
    //     this.showNotification(
    //       'black',
    //       'Edit Record Successfully...!!!',
    //       'bottom',
    //       'center'
    //     );
    //   }
    // });
  }
  deleteItem(row) {
    console.log("pass")
    // this.id = row.id;
    // const dialogRef = this.dialog.open(DeleteComponent, {
    //   data: row,
    // });
    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result === 1) {
    //     const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
    //       (x) => x.id === this.id
    //     );
    //     // for delete we use splice in order to remove single object from DataService
    //     this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
    //     this.refreshTable();
    //     this.showNotification(
    //       'snackbar-danger',
    //       'Delete Record Successfully...!!!',
    //       'bottom',
    //       'center'
    //     );
    //   }
    // });
  }
  /** Whether the number of selected elements matches the total number of rows. */

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  
  

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  // context menu
  onContextMenu(event: MouseEvent, item: Giphy) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }

}


// export class ExampleDataSource extends DataSource<Giphy> {
//   _filterChange = new BehaviorSubject('');
//   get filter(): string {
//     return this._filterChange.value;
//   }
//   set filter(filter: string) {
//     this._filterChange.next(filter);
//   }
//   filteredData: Giphy[] = [];
//   renderedData: Giphy[] = [];
//   constructor(
//     public _exampleDatabase: GiphyService,
//     public _paginator: MatPaginator,
//     public _sort: MatSort
//   ) {
//     super();
//     // Reset to the first page when the user changes the filter.
//     this._filterChange.subscribe(() => (this._paginator.pageIndex = 0));
//   }
//   /** Connect function called by the table to retrieve one stream containing the data to render. */
//   connect(): Observable<Giphy[]> {
//     // Listen for any changes in the base data, sorting, filtering, or pagination
//     const displayDataChanges = [
//       this._exampleDatabase.dataChange,
//       this._sort.sortChange,
//       this._filterChange,
//       this._paginator.page,
//     ];
//     this._exampleDatabase.getAllPatientss();
//     return merge(...displayDataChanges).pipe(
//       map(() => {
//         // Filter data"img": "assets/images/user/user1.jpg",
  
//         this.filteredData = this._exampleDatabase.data
//           .slice()
//           .filter((patients: Giphy) => {
//             const searchStr = (
//               patients.id +
//               patients.gender
//             ).toLowerCase();
//             return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
//           });
//         // Sort filtered data
//         // Grab the page's slice of the filtered sorted data.
//         const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
//         this.renderedData = sortedData.splice(
//           startIndex,
//           this._paginator.pageSize
//         );
//         return this.renderedData;
//       })
//     );
//   }
//   disconnect() { }
//   /** Returns a sorted copy of the database data. */
  
// }

