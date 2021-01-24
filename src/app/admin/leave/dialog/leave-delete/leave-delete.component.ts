import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
// import { ProfessorsService } from '../../../all-professors/professors.service';
import { LeaveService } from '../../leave.service';
import { Leave } from '../../leave';

@Component({
  selector: 'app-leave-delete',
  templateUrl: './leave-delete.component.html',
  styleUrls: ['./leave-delete.component.sass']
})
export class LeaveDeleteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LeaveDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public leaveService: LeaveService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.leaveService.deleteLeave(this.data.id);
  }

  ngOnInit(): void {
  }

}
