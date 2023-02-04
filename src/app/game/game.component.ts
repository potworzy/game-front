import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { GameResponseData, GameService } from './game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  errors: string[] = [];

  gamesList:GameResponseData[] = []

  constructor(private authService: AuthService, private gameService: GameService) { }
  ngOnInit(): void {
    const a = this.gameService.myGames().subscribe({
      next: (data) => {
        if(Array.isArray(data)) this.gamesList = [...data];
      },
      error: (error) => {
        console.log(error)
      }
    })
    console.log('AAAAA', a)
  }
  onSubmit(form:NgForm){
    if(!form.valid) return;
    const title = form.value.title;
    const description = form.value.description;

    let gameDataObservable: Observable<GameResponseData>;

    gameDataObservable = this.gameService.createGame(title, description);

    gameDataObservable.subscribe({
      next: (responseData) => {
        console.log(responseData)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
