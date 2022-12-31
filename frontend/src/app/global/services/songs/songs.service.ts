import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SongModel } from 'src/app/global/models';
import { SocketsService } from 'src/app/global/services';

@Injectable({
  providedIn: 'root',
})
export class SongsService {
  private hostUrl: string;

  timeoutId?: ReturnType<typeof setTimeout>;

  constructor(private http: HttpClient, private socketsService: SocketsService) {
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

  showDeleteMessage = (message: string) => {
    if (this.timeoutId) clearTimeout(this.timeoutId);

    this.socketsService.publish('deleteMessage', { message, show: true });
    this.timeoutId = setTimeout(() => this.socketsService.publish('deleteMessage', { message, show: false }), 2000);
  };
}
