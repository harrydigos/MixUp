import { Component, OnInit } from '@angular/core';
import { LibraryNavState, NavbarState, SongModel } from 'src/app/global/models';
import { PhoneNavbarStateService } from 'src/app/global/services';
import { playlists } from 'src/app/global/utils';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss'],
})
export class PlaylistsComponent implements OnInit {
  navState: NavbarState = 'library';
  libraryNavState: LibraryNavState = 'playlists';

  isPlaying: boolean = false;
  songPlaying: SongModel = {} as SongModel;

  savedPlaylists = playlists.filter((playlist) => playlist.saved);
  youMayLikePlaylists = playlists.filter((playlist) => !playlist.saved);

  constructor(private navbarState: PhoneNavbarStateService) {
    this.navbarState.setNavState('library');
    this.navbarState.setLibraryNavState('playlists');
  }

  ngOnInit(): void {
    this.navbarState.libraryNavState$.subscribe((event) => (this.libraryNavState = event));
  }
}
