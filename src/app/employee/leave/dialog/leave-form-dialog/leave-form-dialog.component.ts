import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { LeaveService } from '../../leave.service';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { Leave } from '../../leave';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { formatDate } from '@angular/common';
import { AuthService } from '../../../../services/auth.service';
@Component({
  selector: 'app-leave-form-dialog',
  templateUrl: './leave-form-dialog.component.html',
  styleUrls: ['./leave-form-dialog.component.sass']
})
export class LeaveFormDialogComponent implements OnInit {

  action: string;
  dialogTitle: string;
  leaveForm: FormGroup;
  leave: Leave;
  category: any;
  // exam_category: Category[];
  // classes: Classes[];
  // sections: Section[];
  // sessions: Session[];
  // classes: Classes[];
  // students: Student[];
  constructor(
    public dialogRef: MatDialogRef<Leave>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public leaveService: LeaveService,
    private fb: FormBuilder
  ) {
    // Set the defaults
    // this.getClasses();
    // this.getStudents();
    // this.getClasses();
    // this.getCategories();
    // this.getSections();
    // this.getSessions();
    this.category = "examination"
    this.action = data.action;
    if (this.action === 'edit') {
      // console.log(data.quiz.date);
      // this.dialogTitle = data.department.name;
      // console.log(data.department);
      this.leave = data.leave;
    } else {
      this.dialogTitle = 'New Fees';
      this.leave = new Leave({});
    }
    this.leaveForm = this.createContactForm();
  }
  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }
  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.leave.id],
      // approved: [this.leave.approved],
      employee: [AuthService.getUser().id, [Validators.required]],
      leave_date: [this.leave.leave_date],
      reason: [this.leave.reason, [Validators.required]],
      // quiz: [this.quiz.slug, [Validators.required]],
      // balance_to_pay: [this.fees.balance_to_pay, [Validators.required]],
      // is_correct: [this.quiz.name, [Validators.required]
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.leaveService.addLeave(this.leaveForm.getRawValue());
    if(this.action === 'edit') {
      console.log("it's editing");
      console.log(this.leaveForm.value);
      this.leaveService.updateLeave(this.leaveForm.getRawValue());
      this.leaveService.editLeave(
        // this.feesForm.value,
        this.leaveForm.value,

      ).subscribe((res) => {
        
        console.log(res);
      
        console.log("successfully logged in");
        
        
      }, (error) => {
        console.error(error);
        // this.error = error.error;
      });

    } else {
      console.log("it's adding");
      console.log(this.leaveForm.value);
      this.leaveService.updateLeave(this.leaveForm.getRawValue());
      this.leaveService.addLeave(
        // this.feesForm.value,
        this.leaveForm.value
      ).subscribe((res) => {
        
        console.log(res);
      
        console.log("successfully logged in");
        
        
      }, (error) => {
        console.error(error);
        // this.error = error.error;
      });

    }
  }

  // getCategories() {
    
  //   this.quizService.getCategories()
  //    .subscribe(
  //      (response) => {
  //        this.exam_category = response;
  //        console.log(response);
         
  //        console.log("get classes working");
  //       //  this.getParentProfile();

  //      }, (error) => {
  //        console.error(error);
  //        console.log("get classes not working")

  //      }
  //    );

  // }

  // getClasses() {
    
  //   this.quizService.getClasses()
  //    .subscribe(
  //      (response) => {
  //        this.classes = response;
  //        console.log(response);
  //        console.log("get classes working");
  //       //  this.getParentProfile();

  //      }, (error) => {
  //        console.error(error);
  //        console.log("get classes not working")

  //      }
  //    );

  // }

  // getSections() {
    
  //   this.quizService.getSection()
  //    .subscribe(
  //      (response) => {
  //        this.sections = response;
  //        console.log(response);
  //        console.log("get sections working");
  //       //  this.getParentProfile();

  //      }, (error) => {
  //        console.error(error);
  //        console.log("get sections not working")

  //      }
  //    );

  // }

  // getSessions() {
    
  //   this.quizService.getSession()
  //    .subscribe(
  //      (response) => {
  //        this.sessions = response;
  //        console.log(response);
  //        console.log("get sessions working");
  //       //  this.getParentProfile();

  //      }, (error) => {
  //        console.error(error);
  //        console.log("get sessions not working")

  //      }
  //    );

  // }


  ngOnInit(): void {
    console.log(AuthService.getUser().id);
  }

}
