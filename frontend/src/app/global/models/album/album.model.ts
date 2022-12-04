export class AlbumModel {
  public name!: string;
  public artist!: string;
  public image!: string;

  constructor(model?: any) {
    Object.assign(this, model);
  }
}
