import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/global/models';
import { NavbarStateService } from 'src/app/global/services';
import { albumsReleases, albumsRecentlyPlayed } from './albums.data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  latestReleases: Album[] = albumsReleases;
  recentlyPlayed: Album[] = albumsRecentlyPlayed;

  constructor(private navbarState: NavbarStateService) {
    this.navbarState.setNavState('home');
  }

  ngOnInit(): void {}
}
