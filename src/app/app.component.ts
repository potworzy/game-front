import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { User } from './auth/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService) { }
  
  ngOnInit(): void {
    
  }
}
