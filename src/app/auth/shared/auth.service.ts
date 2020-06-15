import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import SignupRequest from '../signup/request.payload';
import LoginRequest from '../login/request.payload';
import LoginResponse from '../login/response.payload';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  url = 'http://localhost:8080/api/auth/'
  constructor(private http:HttpClient, private ls:LocalStorageService) { }

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
      return true;
    }));
  }

  refreshToken() {
    const refreshPayload = {
      refreshToken: this.getRefreshToken(),
      username: this.getUsername()
    }
    return this.http.post<LoginResponse>(
      'http://localhost:8080/api/auth/refresh/token',
      refreshPayload
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
}
