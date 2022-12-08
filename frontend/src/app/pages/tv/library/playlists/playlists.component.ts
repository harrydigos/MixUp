import { Component, OnInit } from '@angular/core';
import { NavbarStateService } from 'src/app/global/services';
import { playlists } from 'src/app/global/utils';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss'],
})
export class PlaylistsComponent implements OnInit {
  savedPlaylists = playlists.filter((playlist) => playlist.saved);
  youMayLikePlaylists = playlists.filter((playlist) => !playlist.saved);

  constructor(private navbarState: NavbarStateService) {
    this.navbarState.setLibraryNavState('playlists');
  }

  ngOnInit(): void {}
}
