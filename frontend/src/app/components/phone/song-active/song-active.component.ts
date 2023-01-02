import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SongModel } from 'src/app/global/models';
import { SocketsService, SongPlayingService } from 'src/app/global/services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-song-active',
  templateUrl: './song-active.component.html',
  styleUrls: ['./song-active.component.scss'],
})
export class SongActiveComponent implements OnInit {

  imgUrl: string = '';
  song: string = '';
  artist: string = '';

  isPlaying: boolean = false;
  songPlaying: SongModel = {} as SongModel;

  songTimeStart: string = '';
  songTimeEnd: string = '';
  songCurrentTime: number = 0;
  //If I use the normal songtimeEnd then there is a problem with the value 3.14 for example
  songTimeDurationForBlinding = 204;

  constructor(
    private socketService: SocketsService,
    private songPlayingService: SongPlayingService,
  ) {}

  ngOnInit(): void {
    this.songPlayingService.currentTime$.subscribe((time) => {
      this.songCurrentTime = time;
    });

    this.songPlayingService.songPlaying$.subscribe((song) => (this.songPlaying = song));
    this.songPlayingService.isPlaying$.subscribe((isPlaying) => (this.isPlaying = isPlaying));
  }

  setWidth = (): Record<'width', string> => {
    if (this.songPlaying) return { width: '0%' };
    return {
      width: `${(this.songCurrentTime / this.songTimeDurationForBlinding) * 100}%`,
    };
  };
}
