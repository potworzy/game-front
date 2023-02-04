export class GameData{
    constructor(
    public id: string,
    public title: string,
    public description: string,
    public finished: boolean,
    public owner: string,
    public createdAt: Date
    ){}
  }