import { Component, OnInit } from '@angular/core';
import { SongModel } from 'src/app/global/models';
import { PhoneNavbarState } from 'src/app/global/models/navbar/phoneNavbarState.model';
import { AlbumsService, SocketsService, SongPlayingService, SongsService } from 'src/app/global/services';
import { playlists } from 'src/app/global/utils';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  navState: PhoneNavbarState = 'home';
  artist: string = '';
  song: string = '';
  imgUrl: string = '';

  isPlaying: boolean = false;
  songPlaying: SongModel = {} as SongModel;
  isMuted: boolean = false;

  savedPlaylists = playlists.filter((playlist) => playlist.saved);
  youMayLikePlaylists = playlists.filter((playlist) => !playlist.saved);

  constructor(
    private socketsService: SocketsService,
    private songPlayingService: SongPlayingService,
    private songsService: SongsService,
  ) {}

  ngOnInit(): void {
    // this.socketsService.subscribe('songPlaying', (songPlaying: boolean) => (this.isPlaying = songPlaying));

    this.songPlayingService.songPlaying$.subscribe((song) => (this.songPlaying = song));
    this.songPlayingService.isPlaying$.subscribe((isPlaying) => (this.isPlaying = isPlaying));
    this.socketsService.subscribe('mute', (mute: boolean) => (this.isMuted = mute));
  }
}
