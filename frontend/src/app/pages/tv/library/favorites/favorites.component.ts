import { Component, OnInit } from '@angular/core';
import { AlbumModel } from 'src/app/global/models';
import { AlbumsService, NavbarStateService, SocketsService } from 'src/app/global/services';

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
      isFavorite: true,
      image: 'gods_plan.jpg',
    },
    {
      title: 'BREAK MY SOUL',
      artist: 'Beyoncé',
      album: 'Renaissance',
      duration: '4:38',
      isFavorite: true,
      image: 'break_my_soul.jpg',
    },
    {
      title: 'I’m Good(Blue)',
      artist: 'David Guetta, Bebe Rexha',
      album: 'I’m Good(Blue)',
      duration: '2:55',
      isFavorite: true,
      image: 'im_good.jpg',
    },
    {
      title: 'Die For You',
      artist: 'The Weeknd',
      album: 'Starboy',
      duration: '4:20',
      isFavorite: true,
      image: 'die_for_you.jpg',
    },
    {
      title: 'CLOUDS',
      artist: 'NF',
      album: 'CLOUDS(THE MIXTAPE)',
      duration: '4:03',
      isFavorite: true,
      image: 'clouds.jpg',
    },
    {
      title: 'Astronaut In The Ocean',
      artist: 'Masked Wolf',
      album: 'Astronaut In The Ocean',
      duration: '2:13',
      isFavorite: true,
      image: 'astronaut_in_the_ocean.jpg',
    },
    {
      title: 'Blinding Lights',
      artist: 'The Weeknd',
      album: 'After Hours',
      duration: '3:20',
      isFavorite: true,
      image: 'blinding_lights.jpg',
    },
  ];

  constructor(
    private navbarState: NavbarStateService,
    private albumsService: AlbumsService,
    private socketService: SocketsService,
  ) {
    this.navbarState.setLibraryNavState('favorites');
  }

  ngOnInit(): void {
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
