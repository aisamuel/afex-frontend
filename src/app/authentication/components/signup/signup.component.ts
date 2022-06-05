import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Register} from '../../models/authentication';
import { NgxSpinnerService } from "ngx-spinner";

export const passwordMatchValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
  if (formGroup.get('password').value === formGroup.get('cpassword').value)
    return null;
  else
    return {passwordMismatch: true};
};
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  returnUrl: string;
  hide = true;
  chide = true;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authservice: AuthService,
    private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)]
      ],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      cpassword: ['', Validators.required]
    }, {validator: passwordMatchValidator});
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get f() {
    return this.registerForm.controls;
  }
  /* Shorthands for form controls (used from within template) */
  get password() { return this.registerForm.get('password'); }
  get password2() { return this.registerForm.get('cpassword'); }

  /* Called on each input in either password field */
  onPasswordInput() {
    if (this.registerForm.hasError('passwordMismatch'))
      this.password2.setErrors([{'passwordMismatch': true}]);
    else
      this.password2.setErrors(null);
  }

  public onSubmit(): void {
    this.submitted = true;
    // stop here if form is invalid
    const payload: Register = {
      first_name: this.registerForm.controls['first_name'].value,
      last_name: this.registerForm.controls['last_name'].value,
      password: this.registerForm.controls['password'].value,
      email: this.registerForm.controls['email'].value,
    }
    if (this.registerForm.valid) {
      this.spinner.show();
      this.authservice.register(payload).subscribe((res) => {
        this.showNotification(
          'snackbar-success',
          'Account created Successfully...!!!',
          'bottom',
          'center'
        );
        this.router.navigate(['/authentication/signin']);
        this.spinner.hide();
        console.log(res)
      },
      (err) => {
        this.spinner.hide();
        this.spinner.hide();
        this.showNotification(
          'snackbar-danger',
          err.error.message,
          'bottom',
          'center'
        );
        console.log(err)
      });
  
    } else {
      // this.router.navigate(['/dashboard/main']);
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
