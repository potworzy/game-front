import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { GameComponent } from './game/game.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './shared/guard/auth-guard';

export enum AuthState{
  GUEST,
  LOGGED_IN,
}

const routes: Routes = [
  {path: '', component: HomeComponent, data: {authorization: AuthState.GUEST},},
  { path: 'auth/login', component: AuthComponent, data: {isLogin: true, authorization: AuthState.GUEST } },
  { path: 'auth/signup', component: AuthComponent, data: {isLogin: false, authorization: AuthState.GUEST} },
  { path: 'game', component: GameComponent, data: { authorization: AuthState.LOGGED_IN }, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
