import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environment/environment';
import { Subject, tap } from 'rxjs';
import { User } from './user.model';
import { CookieService } from 'ngx-cookie-service';

export interface AuthResponseData {
  id: string,
  name: string,
  email: string,
  authToken:string,
  refreshToken: string,
  expiresIn: string,
  registered?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  private cookieAuth: string = '';
  private cookieRefresh: string = '';

  user = new Subject<User>();

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  ngOnInit(): void {
    
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(environment.api + "/api/v1/auth/login", {
      email: email,
      password: password,
    }).pipe(tap(responseData => {
      this.handleAuthentication(responseData.email, responseData.name, responseData.id)
    }));
  }
  
  private handleAuthentication(email:string, name:string, id:string) {
    const user = new User(email, name, id, new Date());
    this.user.next(user)
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
