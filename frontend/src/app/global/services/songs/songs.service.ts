import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SongModel } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class SongsService {
  private hostUrl: string;

  constructor(private http: HttpClient) {
    this.hostUrl = environment.host;
  }

  public getAll(): Observable<SongModel[]> {
    return this.http
      .get<SongModel[]>(`${this.hostUrl}/api/songs`)
      .pipe(map((result) => result.map((song) => new SongModel(song))));
  }

  public getById(id: string): Observable<SongModel> {
    return this.http.get<SongModel>(`${this.hostUrl}/api/songs/${id}`).pipe(map((result) => new SongModel(result)));
  }

  public updateSong(resource: SongModel): Observable<SongModel> {
    return this.http
      .put<SongModel>(`${this.hostUrl}/api/songs/${resource._id}`, resource)
      .pipe(map((result) => new SongModel(result)));
  }
}
