import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LyricsType, SongModel } from 'src/app/global/models';
import { SocketsService, SongPlayingService } from 'src/app/global/services';
import { blindingLightsLyrics } from 'src/app/global/utils';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss'],
})
export class WallComponent implements OnInit {
  @ViewChild('videoClip') videoClip?: ElementRef<HTMLVideoElement>;

  song: SongModel = {} as SongModel;
  songPlaying: SongModel = {} as SongModel;

  songCurrentTime: number = 0;
  wallIsOpen: boolean = false;
  isPlaying: boolean = false;

  lyricStart: number = 0;
  lyricEnd: number = 3;
  lyricCounter: number = 2;

  lyrics: LyricsType[] = blindingLightsLyrics;

  constructor(private socketsService: SocketsService, private songPlayingService: SongPlayingService) {}

  ngOnInit(): void {
    this.socketsService.subscribe('wallIsOpen', (isOpen: boolean) => (this.wallIsOpen = isOpen));
    this.songPlayingService.songPlaying$.subscribe((song) => {
      this.songPlaying = song;
      this.resetLyrics();
    });

    this.songPlayingService.isPlaying$.subscribe((isPlaying) => {
      this.isPlaying = isPlaying;
      this.setVideoClip(isPlaying);
    });

    this.songPlayingService.currentTime$.subscribe((time) => {
      this.songCurrentTime = time;

      if (this.songCurrentTime > this.lyrics[this.lyricCounter].end) {
        this.lyricCounter += 3; //counter for array of lyrics
        this.lyricStart += 3; //make 3 lyrics appear on the screen
        this.lyricEnd += 3;
      }
    });
  }

  setVideoClip = (play: boolean) => {
    if (!this.videoClip) return;

    if (play) this.videoClip!.nativeElement.play();
    else this.videoClip!.nativeElement.pause();
  };

  resetLyrics = () => {
    this.lyricStart = 0;
    this.lyricEnd = 3;
    this.lyricCounter = 2;
  };
}
