import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import LoginRequest from './request.payload';
import { AuthService } from '../shared/auth.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  request: LoginRequest;
  successMessage: string;
  isError: boolean;

  constructor(private api:AuthService, private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService) {
    this.request = {
      username: '',
      password: ''
    }
    this.successMessage = ''
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })

    this.activatedRoute.queryParams.subscribe(params => {
      if (params.registered !== undefined && params.registered === 'true') {
        this.toastr.success('Signup Successful')
        this.successMessage = 'Please check your inbox for a validation email ' +
        'and click the contained link to activate your account. '
      }
    })
  }

  login() {
    this.request.username = this.form.get('username').value;
    this.request.password = this.form.get('password').value;
    this.api.login(this.request).subscribe(data => {
      if (data) {
        this.isError = false;
        this.router.navigateByUrl('/');
        this.toastr.success('Login Successful')
      } else {
        this.isError = true;
      }
    }, error => {
      this.isError = true;
      throwError(error);
    })
  }

}
