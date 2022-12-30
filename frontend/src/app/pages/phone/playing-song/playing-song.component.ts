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

  @Input() song: string = 'Blinding Lights';
  @Input() artist: string = 'The Weeknd';
  @Input() album: string = 'After Hours';

  @Input() playlistName: string = '';
  @Input() tracks: number = 0;
  @Input() imgUrl: string = '';

  songTimeStart: string = this.time_duration(0);
  songTimeEnd: string = this.time_duration(204);
  songCurrentTime: number = 0;
  lyricsSmall = true;
  lyricsBig = false;
  showImage = true;

  queue: SongModel[] = [];
  songs: SongModel[] = [];
  selectedSong: SongModel = {} as SongModel;
  songPlaying: SongModel = {} as SongModel;
  isPlaying: boolean = false;
  wallIsOpen: boolean = false;
  repeat: boolean = false;
  isMuted: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private socketsService: SocketsService,
    private songPlayingService: SongPlayingService,
    private albumsService: AlbumsService,
    private songsService: SongsService,
    private queueService: QueueService,
  ) {}

  ngOnInit(): void {
    //Blinding lights id:
    let songId = this.route.snapshot.paramMap.get('id');
    if (!songId) this.back();

    this.songPlayingService.songPlaying$.subscribe((song) => (this.songPlaying = song));
    this.songPlayingService.isPlaying$.subscribe((isPlaying) => (this.isPlaying = isPlaying));
    this.socketsService.subscribe('wallIsOpen', (isOpen: boolean) => (this.wallIsOpen = isOpen));
    this.socketsService.subscribe('mute', (mute: boolean) => (this.isMuted = mute));

    //Make if statement because I can open the song from the preview so not change make the song to start again
    if (!this.isPlaying) {
      this.songsService.getById(songId!).subscribe((result) => {
        this.songs.push(result);
        this.selectSong(this.songs[0]);
        this.songPlayingService.setSongPlaying(this.songs[0]);
      });
    }

    //Every second change the current song time and update it
    interval(1000).subscribe(() => {
      if (this.isPlaying && this.selectedSong) {
        this.songPlayingService.currentTime$.subscribe((currentTime) => {
          this.songCurrentTime = currentTime;
        });
        this.songTimeStart = this.time_duration(this.songCurrentTime);
      }
    });
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

  selectSong = (song: SongModel) => (this.selectedSong = song);

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

  SongPlaying = () => {
    this.selectedSong = this.songPlaying;

    if (this.songPlaying._id === this.selectedSong._id) {
      //maybe there is no reason for if statement below
      if (this.isPlaying) {
        this.songPlayingService.setPlay(!this.isPlaying);
        console.log('Song pause from phone!');
      } else {
        this.songPlayingService.setPlay(!this.isPlaying);
        this.selectedSong.duration = 204;
        console.log('Song play from phone!');
      }
    } else {
      //TODO error here in 2 situations: the below and if waiting for love is playing and then opening new song
      console.log(this.songPlaying._id + this.selectedSong._id);

      this.songPlayingService.setPlay(!this.isPlaying);
      this.socketsService.publish('songPlaying', !this.isPlaying);
    }
  };

  toggleWall = () => this.socketsService.publish('wallIsOpen', !this.wallIsOpen);
}
