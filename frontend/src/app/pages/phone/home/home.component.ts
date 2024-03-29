import { Component, OnInit } from '@angular/core';
import { NavbarState, SongModel } from 'src/app/global/models';
import { PhoneNavbarStateService, SocketsService, SongPlayingService } from 'src/app/global/services';
import { playlists } from 'src/app/global/utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  navState: NavbarState = 'home';

  isPlaying: boolean = false;
  songPlaying: SongModel = {} as SongModel;
  isMuted: boolean = false;

  savedPlaylists = playlists.filter((playlist) => playlist.saved);
  youMayLikePlaylists = playlists.filter((playlist) => !playlist.saved);

  constructor(
    private navbarState: PhoneNavbarStateService,
    private socketsService: SocketsService,
    private songPlayingService: SongPlayingService,
  ) {
    this.navbarState.setNavState('home');
  }

  ngOnInit(): void {
    this.songPlayingService.songPlaying$.subscribe((song) => (this.songPlaying = song));
    this.songPlayingService.isPlaying$.subscribe((isPlaying) => (this.isPlaying = isPlaying));
    this.socketsService.subscribe('mute', (mute: boolean) => (this.isMuted = mute));
  }
}
