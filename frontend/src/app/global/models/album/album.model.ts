export class AlbumModel {
  public name!: string;
  public artist!: string;
  public image!: string;
  public isFavorite!: boolean;
  public noTracks!: number;

  constructor(model?: any) {
    Object.assign(this, model);
  }
}
