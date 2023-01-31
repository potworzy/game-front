import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy{
  private observerAuthMode: Subscription = new Subscription;
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  errors: string[] = [];

  constructor(private authService: AuthService, private route: ActivatedRoute){}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit(form: NgForm) {
    
    const email = form.value.email;
    const password = form.value.password;
    const name = form.value.name;
    const confirmPassword = form.value.confirmPassword;

    if (this.isLoginMode) {
      if (!form.valid) return;
      this.isLoading = true;
      this.authService.login(email, password).subscribe(responseData => {
        this.isLoading = false;
        console.log(responseData)
        }, error => {
        this.isLoading = false;
        this.errors = error.error.message;
        console.error(error)
      });
    } else {
      if (!form.valid) return;
      this.isLoading = true;
      this.authService.signup(email, name, password, confirmPassword).subscribe(responseData => {
        this.isLoading = false;
        console.error(responseData)
      }, error => {
        this.isLoading = false;
        this.errors = error.error.message;
        console.error(error)
      })
    }      
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