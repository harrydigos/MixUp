import { Component, OnInit } from '@angular/core';
import { AlbumModel } from 'src/app/global/models';
import { AlbumsService, NavbarStateService } from 'src/app/global/services';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  favAlbums: AlbumModel[] = [];
  aviciiStories: AlbumModel = {} as AlbumModel;

  songs = [
    {
      title: "God's Plan",
      artist: 'Drake',
      album: 'Scorpion',
      duration: '3:50',
    },
    {
      title: "God's Plan",
      artist: 'Drake',
      album: 'Scorpion',
      duration: '3:50',
    },
    {
      title: "God's Plan",
      artist: 'Drake',
      album: 'Scorpion',
      duration: '3:50',
    },
    {
      title: "God's Plan",
      artist: 'Drake',
      album: 'Scorpion',
      duration: '3:50',
    },
    {
      title: "God's Plan",
      artist: 'Drake',
      album: 'Scorpion',
      duration: '3:50',
    },
  ];

  constructor(
    private navbarState: NavbarStateService,
    private albumsService: AlbumsService
  ) {
    this.navbarState.setLibraryNavState('favorites');
  }

  ngOnInit(): void {
    this.albumsService.getAll().subscribe((result) => {
      this.favAlbums = result.filter((album) => album.isFavorite);
      this.aviciiStories = this.favAlbums
        .splice(
          this.favAlbums.findIndex((album) => album.name === 'Stories'),
          1
        )
        .flat()[0];
    });
  }
}
