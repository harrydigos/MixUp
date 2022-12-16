import { Component, OnInit } from '@angular/core';
import { AlbumModel, SongModel } from 'src/app/global/models';
import { AlbumsService, NavbarStateService, SocketsService, SongsService } from 'src/app/global/services';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  favAlbums: AlbumModel[] = [];
  aviciiStories: AlbumModel = {} as AlbumModel;

  songs: SongModel[] = [];

  constructor(
    private navbarState: NavbarStateService,
    private albumsService: AlbumsService,
    private songsService: SongsService,
    private socketService: SocketsService,
  ) {
    this.navbarState.setLibraryNavState('favorites');
  }

  ngOnInit(): void {
    this.songsService.getAll().subscribe((songs) => {
      this.songs = songs.filter((song) => song.isFavorite);
    });

    this.albumsService.getAll().subscribe((result) => {
      this.favAlbums = result.filter((album) => album.isFavorite);
      this.aviciiStories = this.favAlbums
        .splice(
          this.favAlbums.findIndex((album) => album.name === 'Stories'),
          1,
        )
        .flat()[0];
    });
    this.socketService.subscribe('updateFavoriteAlbum', (albums: AlbumModel[]) => {
      this.favAlbums = albums;
    });
  }
}
