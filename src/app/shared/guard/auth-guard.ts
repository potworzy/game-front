import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthState } from "src/app/app-routing.module";
import { AuthService } from "src/app/auth/auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        switch(route.data['authorization']){
            case AuthState.GUEST:
                return true;
                break;
            case AuthState.LOGGED_IN:
                //todo sprawdzić czy jest user w localstorage jeśli nie router do home
                //todo sprawdzić cze expiresIn jest mniejsze niż now()
                break;
            default:
                return false;
                break;
        }
        return false;
    }
}
