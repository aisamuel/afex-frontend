import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Login } from '../../models/authentication';
// import { CookieService } from 'ngx-cookie-service';
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
    // private cookieService: CookieService,
    private router: Router
  ) {}
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.minLength(5)]],
      password: ['', Validators.required]
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.valid) {
      const payload: Login = {
        password: this.loginForm.controls['password'].value,
        email: this.loginForm.controls['email'].value,
      }
      console.log(payload)
      this.authservice.login(payload).subscribe((resp) => {
        console.log(resp)
        // if(resp.headers.get('x-auth')){
        //   this.cookieService.set("currentUser",resp.headers.get('x-auth'));
        //   console.log(this.cookieService)
        //   this.router.navigate(['/note']);
        // }
      },
      (err) => {
        console.log(err)
      });
      // return;
    } else {
      this.router.navigate(['/patient']);
    }
  }
}
