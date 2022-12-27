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

  // This is the time of the song on the device that is playing the song
  currentTime = new BehaviorSubject<number>(0);
  readonly currentTime$ = this.currentTime.asObservable();

  // This syncs the time when the songTime is changed on a device other than the one playing the song
  timeFromDevice = new BehaviorSubject<number>(0);
  readonly timeFromDevice$ = this.timeFromDevice.asObservable();

  constructor(private socketsService: SocketsService) {
    this.socketsService.subscribe('songPlaying', (song: SongModel) => this.songPlaying.next(song));
    this.socketsService.subscribe('play', (play: boolean) => this.isPlaying.next(play));
    this.socketsService.subscribe('currentTime', (currentTime: number) => this.currentTime.next(currentTime));
    this.socketsService.subscribe('timeFromDevice', (timeFromDevice: number) =>
      this.timeFromDevice.next(timeFromDevice),
    );
  }

  setSongPlaying = (song: SongModel) => {
    this.socketsService.publish('songPlaying', song);
    this.setCurrentTime(0);
  };

  setPlay = (play: boolean) => this.socketsService.publish('play', play);

  setCurrentTime = (currentTime: number) => this.socketsService.publish('currentTime', currentTime);

  setTimeFromDevice = (timeFromDevice: number) => this.socketsService.publish('timeFromDevice', timeFromDevice);
}
