import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumModel, SongModel } from 'src/app/global/models';
import {
  AlbumsService,
  NavbarStateService,
  SocketsService,
  SongPlayingService,
  SongsService,
} from 'src/app/global/services';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
})
export class AlbumComponent implements OnInit {
  album: AlbumModel = {} as AlbumModel;
  songs: SongModel[] = [];
  selectedSong: SongModel = {} as SongModel;
  songPlaying: SongModel = {} as SongModel;
  isPlaying: boolean = false;
  wallIsOpen: boolean = false;

  constructor(
    private navbarState: NavbarStateService,
    private location: Location,
    private route: ActivatedRoute,
    private albumsService: AlbumsService,
    private songsService: SongsService,
    private socketService: SocketsService,
    private songPlayingService: SongPlayingService,
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
          this.selectSong(this.songs[0]);
          this.songPlayingService.setSongPlaying(this.songs[0]);
        });
      });
    });

    this.songPlayingService.songPlaying$.subscribe((song) => (this.songPlaying = song));
    this.songPlayingService.isPlaying$.subscribe((isPlaying) => (this.isPlaying = isPlaying));

    this.socketService.subscribe('wallIsOpen', (isOpen: boolean) => (this.wallIsOpen = isOpen));
  }

  selectSong = (song: SongModel) => {
    this.selectedSong = song;
  };

  playSong = () => {
    if (this.songPlaying._id !== this.selectedSong._id) {
      this.songPlayingService.setSongPlaying(this.selectedSong);
      this.songPlayingService.setPlay(true);
    } else {
      this.songPlayingService.setPlay(!this.isPlaying);
    }
  };

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

  toggleWall = () => this.socketService.publish('wallIsOpen', !this.wallIsOpen);

  back = () => this.location.back();
}
