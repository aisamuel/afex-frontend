import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Register} from '../../models/authentication';
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
    private router: Router
  ) {}
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)]
      ],
      first_name: ['', Validators.required],
      password: ['', Validators.required],
      last_name: ['', Validators.required],
      cpassword: ['', Validators.required]
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get f() {
    return this.registerForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    const payload: Register = {
      first_name: this.registerForm.controls['first_name'].value,
      last_name: this.registerForm.controls['last_name'].value,
      password: this.registerForm.controls['password'].value,
      email: this.registerForm.controls['email'].value,
    }
    if (this.registerForm.valid) {
      console.log(payload)
      this.authservice.register(payload).subscribe((res) => {
        console.log(res)
      },
      (err) => {
        console.log(err)
      });
      // return;

    } else {
      this.router.navigate(['/dashboard/main']);
    }
  }
}
