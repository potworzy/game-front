export class User{
  constructor(public email: string, public id: string, public name: string, private _tokenExpirationDate: Date) { }
  
}