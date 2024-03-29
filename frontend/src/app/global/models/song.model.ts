export class SongModel {
  public _id!: string; // generated by mongoDB
  public title!: string;
  public artist!: string;
  public album!: string;
  public duration!: number;
  public isFavorite!: boolean;
  public image!: string;

  constructor(model?: any) {
    Object.assign(this, model);
  }
}
