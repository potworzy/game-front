import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environment/environment';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { User } from './user.model';

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

  user: BehaviorSubject<User> = new BehaviorSubject<User>({
    email: '',
    id: '',
    name: '',
    refreshToken: '',
  });

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(environment.api + "/api/v1/auth/login", {
      email: email,
      password: password,
    }, { withCredentials: true }).pipe(tap(responseData => {
      console.log('RESP', responseData)
      this.handleAuthentication(responseData.email, responseData.name, responseData.id, responseData.refreshToken)
    }));
  }

  loginRefresh() {
    return this.http.get<AuthResponseData>(environment.api + "/api/v1/auth/refresh", { withCredentials: true }).pipe(tap(responseData => {
      console.log('RESP REFRESH', responseData)
      this.handleAuthentication(responseData.email, responseData.name, responseData.id, responseData.refreshToken)
    }));
  }
  
  private handleAuthentication(email:string, name:string, id:string, refreshToken: string) {
    const user = new User(email, id, name, refreshToken);
    this.user.next(user)
    localStorage.setItem('user', JSON.stringify(user))
  }

  signup(email: string, name: string, password: string, confirmPassword: string) {
    return this.http.post<AuthResponseData>(environment.api + "/api/v1/auth/register", {
      email: email,
      name: name,
      password: password,
      confirmPassword: confirmPassword
    });
  }

  myGames() {
    return this.http.get(environment.api + "/api/v1/game/mygames", { withCredentials: true }).pipe(tap(responseData => {
      let game = responseData
      console.log('MY GAMES', game);

    }));
  }
}
