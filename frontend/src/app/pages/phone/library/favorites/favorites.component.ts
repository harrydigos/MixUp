import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarState, SongModel } from 'src/app/global/models';
import {
  NavbarStateService,
  SongsService,
  SocketsService,
  QueueService,
  SongPlayingService,
} from 'src/app/global/services';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  navState: NavbarState = 'library';

  songs: SongModel[] = [];
  libraryNavState: 'favorites' | 'playlists' = 'favorites';
  @Input() searchText: string = 'Search in favorites';

  songPressed: string = '';
  showMessageRemove: boolean = false;
  surroundWallOpen: boolean = false;

  selectedSong: SongModel = {} as SongModel;
  songPlaying: SongModel = {} as SongModel;
  isPlaying: boolean = false;

  queueMessage: string = '';
  showQueueMessage: boolean = false;

  constructor(
    private navbarState: NavbarStateService,
    private songService: SongsService,
    private socketService: SocketsService,
    private queueService: QueueService,
    private _router: Router,
    private songPlayingService: SongPlayingService,
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

    this.socketService.subscribe('queueMessage', (data: { message: string; show: boolean }) => {
      this.queueMessage = data.message;
      this.showQueueMessage = data.show;
    });

    this.navbarState.libraryNavState$.subscribe((event) => (this.libraryNavState = event));
  }

  openSong(song: SongModel) {
    this.songPressed = song.title;

    console.log("Make the song Pause from 'favorites phone'");
    this.songPlayingService.setPlay(this.isPlaying);

    this._router.navigate([`/phone/play/${song._id}`]);
  }

  //TODO Create modals using css classes

  addSongToQueue = (song: SongModel) => this.queueService.append(song);

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
