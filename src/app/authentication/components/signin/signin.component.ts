import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Login } from '../../models/authentication';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from "ngx-spinner";
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  hide = true;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authservice: AuthService,
    private cookieService: CookieService,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.minLength(5)]],
      password: ['', Validators.required]
    });
    
  }

  public onSubmit(): void {
    this.submitted = true;
    this.spinner.show();
    // stop here if form is invalid
    if (this.loginForm.valid) {
      const payload: Login = {
        password: this.loginForm.controls['password'].value,
        email: this.loginForm.controls['email'].value,
      }
      
      this.authservice.login(payload).subscribe((res) => {
        this.cookieService.set('username', payload.email);  
        this.cookieService.set('password', payload.password); 
        this.router.navigate(['/note']); 
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
        this.showNotification(
          'snackbar-danger',
          err.error.message,
          'bottom',
          'center'
        );
      });
      // return;
    } else {
      // this.router.navigate(['/patient']);
    }
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
