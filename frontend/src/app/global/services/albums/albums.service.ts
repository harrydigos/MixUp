import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { environment } from 'src/environments/environment';
import { AlbumModel } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class AlbumsService {
  private hostUrl: string;

  constructor(private http: HttpClient) {
    this.hostUrl = environment.host;
  }

  public getAll(): Observable<AlbumModel[]> {
    return this.http
      .get<AlbumModel[]>(`${this.hostUrl}/api/albums`)
      .pipe(map((result) => _.map(result, (t) => new AlbumModel(t))));
  }

  public getById(id: string): Observable<AlbumModel> {
    return this.http
      .get<AlbumModel>(`${this.hostUrl}/api/albums/${id}`)
      .pipe(map((result) => new AlbumModel(result)));
  }

  public updateAlbum(resource: AlbumModel): Observable<AlbumModel> {
    return this.http
      .put<AlbumModel>(`${this.hostUrl}/api/albums/${resource._id}`, resource)
      .pipe(map((result) => new AlbumModel(result)));
  }
}
