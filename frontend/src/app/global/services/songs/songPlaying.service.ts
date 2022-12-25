import { Injectable } from '@angular/core';
import { SongModel } from 'src/app/global/models';
import { BehaviorSubject } from 'rxjs';
import { SocketsService } from 'src/app/global/services';

@Injectable({
  providedIn: 'root',
})
export class SongPlayingService {
  songPlaying = new BehaviorSubject<SongModel>({} as SongModel);
  readonly songPlaying$ = this.songPlaying.asObservable();

  isPlaying = new BehaviorSubject<boolean>(false);
  readonly isPlaying$ = this.isPlaying.asObservable();

  currentTime = new BehaviorSubject<number>(0);
  readonly currentTime$ = this.currentTime.asObservable();

  constructor(private socketsService: SocketsService) {
    this.socketsService.subscribe('songPlaying', (song: SongModel) => this.songPlaying.next(song));
    this.socketsService.subscribe('play', (play: boolean) => this.isPlaying.next(play));
    this.socketsService.subscribe('currentTime', (currentTime: number) => this.currentTime.next(currentTime));
  }

  setSongPlaying = (song: SongModel) => {
    this.socketsService.publish('songPlaying', song);
    this.setCurrentTime(0);
  };

  setPlay = (play: boolean) => this.socketsService.publish('play', play);

  setCurrentTime = (currentTime: number) => this.socketsService.publish('currentTime', currentTime);
}
