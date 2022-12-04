import { Component, OnInit } from '@angular/core';
import { AlbumModel } from 'src/app/global/models';
import { AlbumsService, NavbarStateService } from 'src/app/global/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  latestReleases: AlbumModel[] = [];
  recentlyPlayed: AlbumModel[] = [];

  imgAlbumPath: string = 'assets/images/albums/';

  constructor(
    private navbarState: NavbarStateService,
    private albumsService: AlbumsService
  ) {
    this.navbarState.setNavState('home');
  }

  ngOnInit(): void {
    this.getAllAlbums();
  }

  private getAllAlbums(): void {
    this.albumsService.getAll().subscribe((result) => {
      this.latestReleases = result.slice(0, 6);
      this.recentlyPlayed = result.slice(6);
      console.log(result)
    });
  }
}
