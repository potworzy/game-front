import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { Observable, Subscription } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy{
  private observerAuthMode: Subscription = new Subscription;
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  errors: string[] = [];

  constructor(private authService: AuthService, private route: ActivatedRoute, private router:Router, private cookie: CookieService){}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return;
    const email = form.value.email;
    const password = form.value.password;
    const name = form.value.name;
    const confirmPassword = form.value.confirmPassword;

    let authObservable: Observable<AuthResponseData>;
    this.isLoading = true;
    if (this.isLoginMode) {
      authObservable = this.authService.login(email, password);
    } else {
      authObservable = this.authService.signup(email, name, password, confirmPassword);
    }

    authObservable.subscribe({
        next: (responseData) => {
          this.isLoading = false;
          this.router.navigate(['game'])
        },
        error: (error) => {
          this.isLoading = false;
          this.errors = Array.isArray(error.error.message) ? error.error.message : [error.error.message];
        }
    });
    
    form.reset();
  }
  ngOnInit(): void {
    this.observerAuthMode = this.route.data.subscribe(data => {
      this.isLoginMode = data['isLogin'];
    })
  }
  ngOnDestroy(): void {
    this.observerAuthMode.unsubscribe();
  }
  
}