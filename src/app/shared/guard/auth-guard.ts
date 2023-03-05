import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, take, tap } from "rxjs";
import { AuthState } from "src/app/app-routing.module";
import { AuthService } from "src/app/auth/auth.service";
import { User } from "src/app/auth/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    console.log('AUTHGUARD')
    switch (route.data['authorization']) {
      case AuthState.GUEST:
        return true;
        break;
      case AuthState.LOGGED_IN:
        //todo sprawdzić czy jest user w localstorage jeśli nie router do login
        //todo sprawdzić cze expiresIn jest mniejsze niż now()
        //if(!this.checkUserWasLogged()) this.router.navigate( ['auth/login']);
        //console.log('wait ',this.refreshToken())
        
        return true;
        break;
      default:
        return false;
        break;
    }
    return false;
  }

  checkUserWasLogged(): boolean{
    //sprawdzamy czy user się logował i jest w LS
    const dataFromLocalStorage:string|null = localStorage.getItem('user');
    if (!dataFromLocalStorage) return false;
    const user:User = JSON.parse(dataFromLocalStorage)
    //sprawdzamy czy token nie wygasł, jeśli tak to refresh
    if (user.expiresAuth) {
      const now = Date.now()
      const expiresAuth = new Date(user.expiresAuth)
      //if (Date.now() > new Date(user.expiresAuth).getTime()) this.refreshToken().pipe(take(1));
      return false;
    }

    return false;
  }
  refreshToken(){
    console.log('REFR')
    return this.authService.loginRefresh().subscribe(event => {
      console.log('SUBSCRIBE Fn', event);
      return true;
    })
  }
}
