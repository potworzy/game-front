import { Data } from "@angular/router";

export class User{
  constructor(public email: string, public id: string, public name: string, public refreshToken: string, public expiresAuth: string) { }
  
}