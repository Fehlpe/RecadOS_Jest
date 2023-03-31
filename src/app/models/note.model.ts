import { v4 } from "uuid";

export class Note {
  constructor(
    private _title: string,
    private _description: string,
    private _userId: string
  ) {}

  public get description() {
    return this._description;
  }

  public get title() {
    return this._title;
  }
  public get userId() {
    return this._userId;
  }

  public static create(title: string, description: string, userId: string) {
    const note = new Note(title, description, userId);

    return note;
  }

  public toJson() {
    return {
      title: this._title,
      description: this.description,
      userId: this.userId,
    };
  }
}
