import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { ApiResponse } from './model/api.response';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private router: Router) { }

  login(loginPayload): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}` + `/login`, loginPayload);
  }

  getJwtToken() {
    return this.http.get<string>(`${this.baseUrl}` + `/token`);
  }

  source(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}` + `/source`);
  }

  exit() {
    console.log('>> exit << ' + `${this.baseUrl}` + `/logout`);
    return this.http.get<ApiResponse>(`${this.baseUrl}` + `/logout`);
  }

  sessionExpired() {
    const token = localStorage.getItem('token');
    if (this.jwtHelper.isTokenExpired(token)) {
      localStorage.removeItem('token');
      this.router.navigate(['login']);
      return true;
    }
  }
}
