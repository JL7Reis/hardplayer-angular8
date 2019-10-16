import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { User } from './model/user.model';
import { ApiResponse } from './model/api.response';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'http://localhost:8080';
  private userUrl = `${this.baseUrl}` + '/v1/user';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private router: Router) { }

  login(loginPayload): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}` + `/token/generate-token`, loginPayload);
  }

  getJwtToken() {
    return this.http.get<string>(`${this.baseUrl}` + `/getToken`);
  }

  source(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}` + `/source`);
  }

  exit(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}` + `/logout`);
  }

  getUsers(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.userUrl}` + `/getUsers`);
  }

  getUserById(cpf: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.userUrl}` + `/getUser/` + cpf);
  }

  createUser(user: User): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.userUrl}` + `/addUser`, user);
  }

  updateUser(user: User): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.userUrl}` + `/updateUser`, user);
  }

  deleteUser(cpf: string): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.userUrl}` + `/deleteUser/` + cpf);
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
