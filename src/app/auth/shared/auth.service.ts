import { Injectable, Output, EventEmitter, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import SignupRequest from '../signup/request.payload';
import LoginRequest from '../login/request.payload';
import LoginResponse from '../login/response.payload'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  
  url = 'http://localhost:8080/api/auth/'
  
  constructor(private http:HttpClient, private ls:LocalStorageService) { }

  ngOnInit(): void {
    if(this.isLoggedIn()) {
      this.loggedIn.emit(true)
      this.username.emit(this.getUsername())
    }
  }

  @Output() username: EventEmitter<string> = new EventEmitter();
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();

  signup(payload: SignupRequest):Observable<string> {
    return this.http.post(this.url+'signup', payload, { responseType: 'text' });
  }

  login(payload: LoginRequest): Observable<boolean> {
    return this.http.post<LoginResponse>(
      this.url+'login', payload
    ).pipe(map(data => {
      this.ls.store('authenticationToken', data.authenticationToken)
      this.ls.store('refreshToken', data.refreshToken)
      this.ls.store('expiresAt', data.expiresAt)
      this.ls.store('username', data.username)
      this.loggedIn.emit(true)
      this.username.emit(data.username)
      return true;
    }));
  }

  logout() {
    const payload = {
      refreshToken: this.getRefreshToken(),
      username: this.getUsername()
    }
    this.http.post(this.url+'logout', payload, { responseType: 'text'}).subscribe(data => {
      console.log(data);
    }, error => {
      throwError(error);
    })
    this.ls.clear('authenticationToken');
    this.ls.clear('refreshToken');
    this.ls.clear('expiresAt');
    this.ls.clear('username');
    this.loggedIn.emit(false)
    this.username.emit('')
  } 

  refreshToken() {
    const payload = {
      refreshToken: this.getRefreshToken(),
      username: this.getUsername()
    }
    return this.http.post<LoginResponse>(
      'http://localhost:8080/api/auth/refresh/token',
      payload
    ).pipe(tap(res => {
      this.ls.store('authenticationToken', res.authenticationToken)
      this.ls.store('expiresAt', res.expiresAt)
    }))
  }

  getJwtToken(): string {
    return this.ls.retrieve('authenticationToken')
  }

  getRefreshToken(): string {
    return this.ls.retrieve('refreshToken')
  }

  getUsername(): string {
    return this.ls.retrieve('username')
  }

  getExpirationTime(): string {
    return this.ls.retrieve('expiresAt')
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }
}
