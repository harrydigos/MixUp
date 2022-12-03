import { Component, OnInit } from '@angular/core';
import { NavbarStateService } from 'src/app/global/services';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss'],
})
export class PlaylistsComponent implements OnInit {
  constructor(private navbarState: NavbarStateService) {
    this.navbarState.setLibraryNavState('playlists');
  }

  ngOnInit(): void {}
}
