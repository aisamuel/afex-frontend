import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule } from '@angular/material/menu';
import { MatStepperModule } from '@angular/material/stepper';
// import { ReactiveFormsModule } from '@angular/forms';
// import { CookieService } from 'ngx-cookie-service';
import { ArchwizardModule } from 'angular-archwizard';

import { AdminRoutingModule } from './admin-routing.module';
import { IpAddressComponent } from './ip-address/ip-address.component';
import { LeaveComponent } from './leave/leave.component';
import { LeaveFormDialogComponent } from './leave/dialog/leave-form-dialog/leave-form-dialog.component';
import { LeaveDeleteComponent } from './leave/dialog/leave-delete/leave-delete.component';
import { OverviewComponent } from './overview/overview.component';
import { AddressFormDialogComponent } from './ip-address/dialog/address-form-dialog/address-form-dialog.component';
import { AddressDeleteComponent } from './ip-address/dialog/address-delete/address-delete.component';


@NgModule({
  declarations: [IpAddressComponent, LeaveComponent, LeaveFormDialogComponent, LeaveDeleteComponent, OverviewComponent, AddressFormDialogComponent, AddressDeleteComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ArchwizardModule,
    // CookieService,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSortModule,
    MatToolbarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatTabsModule,
    MatMenuModule,
    MatRadioModule,
    MaterialFileInputModule,
  ]
})
export class AdminModule { }
