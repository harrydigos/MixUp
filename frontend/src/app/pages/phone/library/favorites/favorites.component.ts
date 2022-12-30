import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SongModel } from 'src/app/global/models';
import { PhoneNavbarState } from 'src/app/global/models/navbar/phoneNavbarState.model';
import { NavbarStateService, SongsService, SocketsService, QueueService } from 'src/app/global/services';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  navState: PhoneNavbarState = 'library';

  songs: SongModel[] = [];
  libraryNavState: 'favorites' | 'playlists' = 'favorites';
  @Input() searchText: string = 'Search in favorites';

  // blindingLights: AlbumModel = {} as AlbumModel;

  playBlindingLights: boolean = false;
  songPressed: string = '';
  showMessageQueue: boolean = false;
  showMessageRemove: boolean = false;
  surroundWallOpen: boolean = false;

  selectedSong: SongModel = {} as SongModel;
  songPlaying: SongModel = {} as SongModel;
  isPlaying: boolean = false;
  song2queue: SongModel = {} as SongModel;
  queue: SongModel[] = [];

  constructor(
    private navbarState: NavbarStateService,
    private songService: SongsService,
    private socketService: SocketsService,
    private queueService: QueueService,
    private _router: Router,
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

    this.queueService.queue$.subscribe((queue) => (this.queue = queue));

    this.navbarState.libraryNavState$.subscribe((event) => (this.libraryNavState = event));
  }

  openSong(song: SongModel) {
    this.songPressed = song.title;

    if (song.title === 'Blinding Lights') {
      this._router.navigate([`/phone/play/${song._id}`]);
    }
  }

  //TODO Create modals using css classes

  songAdd2Queue(song: SongModel) {
    this.song2queue = song;
    this.queueService.append(song);

    this.showMessageQueue = true;
    setTimeout(() => {
      this.showMessageQueue = false;
    }, 2500);
  }

  rmSongFav(song: SongModel) {
    this.songPressed = song.title;

    song.isFavorite = !song.isFavorite;
    this.songService.updateSong(song).subscribe();
    this.socketService.publish('updateFavoriteSong', song);

    this.showMessageRemove = true;
    setTimeout(() => {
      this.showMessageRemove = false;
    }, 2500);
  }
}
