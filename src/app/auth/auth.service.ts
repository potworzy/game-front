import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environment/environment';

interface AuthResponseData {
    id: string,
    name: string,
    email: string,
    refreshToken: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(environment.api + "/api/v1/auth/login", {
      email: email,
      password: password,
    });
  }
  
  signup(email: string, name: string, password: string, confirmPassword: string) {
    return this.http.post<AuthResponseData>(environment.api + "/api/v1/auth/register", {
      email: email,
      name: name,
      password: password,
      confirmPassword: confirmPassword
    });
  }
}
