import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AlbumModel, SongModel } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class SongsService {
  private hostUrl: string;

  constructor(private http: HttpClient) {
    this.hostUrl = environment.host;
  }

  public getById(id: string): Observable<SongModel> {
    return this.http
      .get<SongModel>(`${this.hostUrl}/api/songs/${id}`)
      .pipe(map((result) => new SongModel(result)));
  }

  public updateAlbum(resource: AlbumModel): Observable<AlbumModel> {
    return this.http
      .put<AlbumModel>(`${this.hostUrl}/api/albums/${resource._id}`, resource)
      .pipe(map((result) => new AlbumModel(result)));
  }
}
