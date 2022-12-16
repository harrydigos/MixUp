import { Component, OnInit, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { AlbumModel, SongModel } from 'src/app/global/models';
import { PhoneNavbarState } from 'src/app/global/models/navbar/phoneNavbarState.model';
import { NavbarStateService, AlbumsService, SongsService, SocketsService } from 'src/app/global/services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  navState: PhoneNavbarState = 'library';
  songPlaying = environment.songPlaying;

  songs: SongModel[] = [];

  libraryNavState: 'favorites' | 'playlists' = 'favorites';
  @Input() searchText: string = 'Search in favorites';

  blindingLights: AlbumModel = {} as AlbumModel;

  playBlindingLights: boolean = false;
  songPressed: string = '';
  showMessageQueue: boolean = false;
  showMessageRemove: boolean = false;
  surroundWallOpen: boolean = false;

  constructor(
    private navbarState: NavbarStateService,
    private songService: SongsService,
    private socketService: SocketsService,
  ) {
    this.navbarState.setLibraryNavState('favorites');
  }

  ngOnInit(): void {
    this.songService.getAll().subscribe((songs) => {
      this.songs = songs.filter((song) => song.isFavorite);
    });

    this.socketService.subscribe('updateFavoriteSong', (song: SongModel) => {
      if (song.isFavorite) this.songs.push(song);
      else this.songs = this.songs.filter((favSong) => favSong._id !== song._id);
    });

    this.navbarState.libraryNavState$.subscribe((event) => (this.libraryNavState = event));
  }

  //Open song (mostly check about blinding lights)

  openSong(songname: any) {
    this.songPressed = songname;
    if (songname === 'Blinding Lights') {
      console.log('Open blinding lights');
      this.playBlindingLights = true;
    }
  }

  //TODO Create modals using css classes

  songAdd2Queue(songname: string) {
    console.log("Add '" + songname + "' to the queue");
    this.songPressed = songname;
    this.showMessageQueue = true;

    setTimeout(() => {
      this.showMessageQueue = false;
    }, 2500);
  }

  rmSongFav(songname: string) {
    let removeSong = this.songs.find((song) => song.title === songname);
    if (!removeSong) return;

    removeSong.isFavorite = false;
    this.songService.updateSong(removeSong).subscribe();
    this.socketService.publish('updateFavoriteSong', removeSong);
    this.showMessageRemove = true;

    setTimeout(() => {
      this.showMessageRemove = false;
    }, 2500);
  }
}
