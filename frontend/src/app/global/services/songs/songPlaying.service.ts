import { Injectable } from '@angular/core';
import { SongModel } from '../../models';
import { BehaviorSubject } from 'rxjs';
import { SocketsService } from '../sockets/sockets.service';

@Injectable({
  providedIn: 'root',
})
export class SongPlayingService {
  songPlaying = new BehaviorSubject<SongModel>({} as SongModel);
  readonly songPlaying$ = this.songPlaying.asObservable();

  isPlaying = new BehaviorSubject<boolean>(false);
  readonly isPlaying$ = this.isPlaying.asObservable();

  constructor(private socketsService: SocketsService) {
    this.socketsService.subscribe('songPlaying', (song: SongModel) => this.songPlaying.next(song));
    this.socketsService.subscribe('play', (play: boolean) => this.isPlaying.next(play));
  }

  setSongPlaying = (song: SongModel): void => this.socketsService.publish('songPlaying', song);

  setPlay = (play: boolean): void => this.socketsService.publish('play', play);
}
