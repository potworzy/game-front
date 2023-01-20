import { Component, Input } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;

  constructor(private authService: AuthService){}

  // @Input() set chooseMode(value: boolean) {
  //     this.isLoginMode = value;
  // }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return;
    const email = form.value.email;
    const password = form.value.password;

    if (this.isLoginMode) {
        this.authService.signup(email, password).subscribe(responseData => {
        console.log(responseData)
      }, error => {
        console.log(error)
      });
    } else {
      
    }      
    form.reset();
  }
}