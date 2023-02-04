import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environment/environment';
import { GameData } from './game.model';

export interface GameResponseData{
  id: string,
  title: string,
  description?: string,
  finished: boolean,
  owner: string,
  createdAt?: Date,
  lastModification?: Date
}

@Injectable({
  providedIn: 'root'
})
export class GameService implements OnInit {

  gameData: BehaviorSubject<GameData> = new BehaviorSubject<GameData>({
    id: '',
    title: '',
    description: '',
    finished: false,
    owner: '',
    createdAt: new Date(Date.now())
  })

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    ///throw new Error('Method not implemented.');
  }
  

  createGame(title:string, description:string = ''){
    return this.http.post<GameResponseData>(environment.api + "/api/v1/game/create",{title, description},{withCredentials:true}).pipe(tap(responseData => {
      console.log('RESP', responseData);
    }))
  }

  myGames() {
    return this.http.get(environment.api + "/api/v1/game/mygames", { withCredentials: true }).pipe(tap(responseData => {
      let game = responseData
      console.log('MY GAMES', game);
    }));
  }
}
