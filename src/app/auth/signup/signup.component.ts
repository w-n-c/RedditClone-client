import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import SignupRequest from './request.payload';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  request :SignupRequest;
  form: FormGroup;

  constructor(private api: AuthService, private router: Router, private toastr: ToastrService) {
    this.request = {
      username: '',
      password: '',
      email: ''
    };
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('',[ Validators.required, Validators.email ]),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  signup() {
    this.request.email = this.form.get('email').value;
    this.request.username = this.form.get('username').value;
    this.request.password = this.form.get('password').value;

    this.api.signup(this.request)
      .subscribe(() => {
        this.router.navigate(['/login'], {queryParams: {registered: 'true' }})
      }, () => {
        this.toastr.error('Registration failed! Please try again')
      }
    )
  }

}
