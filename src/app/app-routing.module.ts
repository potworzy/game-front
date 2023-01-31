import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { GameComponent } from './game/game.component';

const routes: Routes = [
  { path: 'auth/login', component: AuthComponent, data: {isLogin: true} },
  { path: 'auth/signup', component: AuthComponent, data: {isLogin: false} },
  { path: 'game', component: GameComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
