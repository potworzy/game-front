import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  constructor(private authService: AuthService) { }
  ngOnInit(): void {
    console.log('START')

    const a = this.authService.myGames().subscribe({
      next: (data) => {
        console.log(data)
      },
      error: (error) => {
        if (error.status === 401) {
          this.authService.loginRefresh().subscribe({
            
          })
        }
        console.log('taki bląd',error)
      }
    })
    console.log('AAAAA', a)
  }

}
