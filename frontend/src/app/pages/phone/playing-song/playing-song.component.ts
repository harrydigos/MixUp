import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PhoneNavbarState } from 'src/app/global/models/navbar/phoneNavbarState.model';
import { SocketsService, SongPlayingService, SongsService } from 'src/app/global/services';
import { LyricsType, SongModel } from 'src/app/global/models';
import { blindingLightsLyrics } from 'src/app/global/utils';

type LyricsPhone = LyricsType & { isActive: boolean };

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

  lyrics: LyricsPhone[] = blindingLightsLyrics.map((lyric) => ({ ...lyric, isActive: false } as LyricsPhone));
  showLyrics: boolean = false;

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
    let songId = this.route.snapshot.paramMap.get('id');

    if (!songId) this.back();

    this.songsService.getById(songId!).subscribe((result) => {
      this.song = result;
      this.songPlayingService.setSongPlaying(this.song);
      this.songTimeStart = this.getTimeDuration(0);
      this.songTimeEnd = this.getTimeDuration(this.song.duration * 60);
    });

    this.songPlayingService.songPlaying$.subscribe((song) => (this.songPlaying = song));
    this.songPlayingService.isPlaying$.subscribe((isPlaying) => (this.isPlaying = isPlaying));

    this.songPlayingService.currentTime$.subscribe((time) => {
      console.log(time);
      this.songCurrentTime = time;
      this.songTimeStart = this.getTimeDuration(time);

      this.lyrics.map((lyric) => {
        if (lyric.start <= time && lyric.end >= time) {
          lyric.isActive = true;
        } else lyric.isActive = false;
      });
    });

    this.socketsService.subscribe('wallIsOpen', (isOpen: boolean) => (this.wallIsOpen = isOpen));

    if (!Object.keys(this.songPlaying).length) {
      this.songPlayingService.setSongPlaying(this.song);
    }
  }

  toggleLyrics = () => (this.showLyrics = !this.showLyrics);

  back = () => this.location.back();

  getTimeDuration = (value: number) => {
    let minutes = Math.floor(value / 60.0);
    let seconds = Math.round(value % 60.0);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  /**
   * Select song if it's not already selected
   * Toggle the play state
   */
  playSong = () => {
    if (!Object.keys(this.songPlaying).length) {
      this.songPlayingService.setSongPlaying(this.song);
    }
    this.songPlayingService.setPlay(!this.isPlaying);
  };

  toggleWall = () => this.socketsService.publish('wallIsOpen', !this.wallIsOpen);
}
