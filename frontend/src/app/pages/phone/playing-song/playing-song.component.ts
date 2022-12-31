import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { PhoneNavbarState } from 'src/app/global/models/navbar/phoneNavbarState.model';
import { AlbumsService, QueueService, SocketsService, SongPlayingService, SongsService } from 'src/app/global/services';
import { AlbumModel, SongModel } from 'src/app/global/models';
import { interval } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-playing-song',
  templateUrl: './playing-song.component.html',
  styleUrls: ['./playing-song.component.scss'],
})
export class PlayingSongComponent implements OnInit {
  navState: PhoneNavbarState = 'hide';

  song: SongModel = {} as SongModel;

  songTimeStart: string = '';
  songTimeEnd: string = '';
  songCurrentTime: number = 0;

  lyricsSmall = true;
  lyricsBig = false;
  showImage = true;

  songPlaying: SongModel = {} as SongModel;
  isPlaying: boolean = false;
  wallIsOpen: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private socketsService: SocketsService,
    private songPlayingService: SongPlayingService,
    private songsService: SongsService,
  ) {}

  ngOnInit(): void {
    //Blinding lights id:
    let songId = this.route.snapshot.paramMap.get('id');
    if (!songId) this.back();

    this.songsService.getById(songId!).subscribe((result) => {
      this.song = result;
      this.songTimeStart = this.time_duration(0);
      this.songTimeEnd = this.time_duration(204);
    });

    this.songPlayingService.songPlaying$.subscribe((song) => (this.songPlaying = song));
    this.songPlayingService.isPlaying$.subscribe((isPlaying) => (this.isPlaying = isPlaying));

    this.songPlayingService.currentTime$.subscribe((time) => {
      console.log(time);
      this.songCurrentTime = time;
      this.songTimeStart = this.time_duration(time);
    });

    this.socketsService.subscribe('wallIsOpen', (isOpen: boolean) => (this.wallIsOpen = isOpen));

    //Make if statement because I can open the song from the preview so not change make the song to start again
    if (!Object.keys(this.songPlaying).length) {
      this.songPlayingService.setSongPlaying(this.song);
    }
  }

  lyricsClose() {
    this.lyricsBig = false;
    this.lyricsSmall = true;
    this.showImage = true;
  }

  lyricsOpen() {
    this.lyricsSmall = false;
    this.lyricsBig = true;
    this.showImage = false;
  }

  back(): void {
    this.location.back();
  }

  time_duration(value: number) {
    let time, m, s, text;
    time = value;
    if (Number.isNaN(value)) return '0:00';
    if (time < 0) time = Math.abs(time);
    m = Math.round(time / 60.0);
    s = Math.round(time % 60.0);
    if (s < 10) s = '0' + s;
    if (s >= 30) {
      if (m == 0) text = '0:' + s;
      else text = m - 1 + ':' + s;
    } else text = m + ':' + s;
    return text;
  }

  playSong = () => {
    if (!Object.keys(this.songPlaying).length) {
      this.songPlayingService.setSongPlaying(this.song);
    }

    if (this.isPlaying) {
      this.songPlayingService.setPlay(!this.isPlaying);
      console.log('Song pause from phone!');
    } else {
      this.songPlayingService.setPlay(!this.isPlaying);
      console.log('Song play from phone!');
    }
  };

  toggleWall = () => this.socketsService.publish('wallIsOpen', !this.wallIsOpen);
}
