import { tap } from 'rxjs/operators';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private router: Router, private jwtHelper: JwtHelperService, ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('token');
    this.sessionExpired(token);

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        if (this.jwtHelper.isTokenExpired(token)) {
          localStorage.removeItem('token');
          this.router.navigate(['login']);
        }
        event = event.clone({body: this.modifyBody(event.body)});
      }
      return event;
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          localStorage.removeItem('token');
          this.router.navigate(['login']);
          alert('Session expired');
        }
        // return;
      }
    }));
  }

  modifyBody(body: any) {
    /*
    * write your logic to modify the body
    * */
  }

  sessionExpired(token) {
    // const token = localStorage.getItem('token');
    if (this.jwtHelper.isTokenExpired(token)) {
      localStorage.removeItem('token');
      this.router.navigate(['login']);
      return true;
    }
  }
}
