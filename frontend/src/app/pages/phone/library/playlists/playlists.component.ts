import { Component, OnInit } from '@angular/core';
import { PhoneNavbarState } from 'src/app/global/models/navbar/phoneNavbarState.model';
import { NavbarStateService } from 'src/app/global/services';
import { playlists } from 'src/app/global/utils';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {
  navState: PhoneNavbarState = 'library';
  libraryNavState: 'favorites' | 'playlists' = 'favorites';
  
  isPlaying: boolean = false;


  savedPlaylists = playlists.filter((playlist) => playlist.saved);
  youMayLikePlaylists = playlists.filter((playlist) => !playlist.saved);

  constructor(private navbarState: NavbarStateService) {
    this.navbarState.setLibraryNavState('playlists');
  }

  ngOnInit(): void {
    this.navbarState.libraryNavState$.subscribe(
      (event) => (this.libraryNavState = event)
    );
  }

}
