import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { AuthService } from './auth/shared/auth.service';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import LoginResponse from './auth/login/response.payload';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  isTokenRefreshing: boolean = false;
  refreshTokenSubject: BehaviorSubject<unknown> = new BehaviorSubject(null);
  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (req.url.indexOf('refresh') !== -1 || req.url.indexOf('login') !== -1) {
      return next.handle(req);
    }
    const jwtToken = this.authService.getJwtToken();
    return next.handle(this.addToken(req, jwtToken)).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 403) {
        return this.handleAuthErrors(req, next);
      } else {
        return throwError(error);
      }
    }));
  }

  private handleAuthErrors(req: HttpRequest<unknown>, next: HttpHandler) {
    if (!this.isTokenRefreshing) {
      this.isTokenRefreshing = true;
      this.refreshTokenSubject.next(null);
      return this.authService.refreshToken().pipe(
        switchMap((refreshRes: LoginResponse) => { 
          this.isTokenRefreshing = false;
          this.refreshTokenSubject.next(refreshRes.authenticationToken)
          return next.handle(this.addToken(req, refreshRes.authenticationToken))
        })
      )
    } else {
      return this.refreshTokenSubject.pipe(
        filter(result => result !== null),
        take(1),
        switchMap((res) => {
          return next.handle(this.addToken(req, this.authService.getJwtToken()));
        })
      )
    }
  }

  private addToken(req: HttpRequest<unknown>, token: string) {
    return req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token)
    })
  }
}
