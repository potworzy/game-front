import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{
  private userSubscription: Subscription = new Subscription;
  isAuthenticated = false;

  constructor(private authService: AuthService){}
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe()
  }
  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe({
      next: (user) => {
        this.isAuthenticated = !!user;
      }
    })
  }

  onSelectAuth() {
    
    
  }

logout() {
  this.isAuthenticated = !this.isAuthenticated;
  this.authService.logout();
}

}
