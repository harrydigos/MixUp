import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumModel, SongModel } from 'src/app/global/models';
import { AlbumsService, NavbarStateService, SocketsService, SongsService } from 'src/app/global/services';
import { result } from 'lodash';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
})
export class AlbumComponent implements OnInit {
  album: AlbumModel = {} as AlbumModel;
  songs: SongModel[] = [];
  playingSong: string = '';
  isPlaying: boolean = false;

  constructor(
    private navbarState: NavbarStateService,
    private location: Location,
    private route: ActivatedRoute,
    private albumsService: AlbumsService,
    private songsService: SongsService,
    private socketService: SocketsService,
  ) {
    this.navbarState.setNavState('hide');
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if (!id) this.back();

    // Fetch album and after that fetch its songs
    this.albumsService.getById(id!).subscribe((result) => {
      this.album = result;
      this.album.songs.forEach((songId) => {
        this.songsService.getById(songId).subscribe((result) => {
          this.songs.push(result);
          if (this.songs.length === 1) this.playSong(this.songs[0].title);
        });
      });
    });

    this.socketService.subscribe('play', (isPlaying: boolean) => {
      this.isPlaying = isPlaying;
    });
  }

  playSong(song: string): void {
    this.playingSong = song;
  }

  getTimeOfSong(duration: number): string {
    let [minutes, seconds] = duration.toString().split('.');
    seconds.length === 1 ? (seconds += '0') : null;
    return `${minutes}:${seconds}`;
  }

  toggleFavorite(): void {
    this.album.isFavorite = !this.album.isFavorite;
    this.albumsService.updateAlbum(this.album).subscribe();
    this.socketService.publish('updateFavoriteAlbum', this.album);
  }

  back() {
    this.location.back();
  }

  togglePlay(): void {
    this.isPlaying = !this.isPlaying;
    this.socketService.publish('play', this.isPlaying);
  }
}
