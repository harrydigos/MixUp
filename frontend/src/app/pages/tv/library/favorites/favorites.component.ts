import { Component, OnInit } from '@angular/core';
import { AlbumModel, SongModel } from 'src/app/global/models';
import {
  AlbumsService,
  NavbarStateService,
  QueueService,
  SocketsService,
  SongPlayingService,
  SongsService,
} from 'src/app/global/services';

@Component({
  selector: 'app-favorites',
  template: `
    <div>
      <div>
        <div class="mt-10 mb-6 flex w-full select-none items-center justify-between text-white">
          <div class="font-semibold text-[40px]">Favorite Songs</div>
          <div class="flex items-center justify-center gap-2 pr-[100px] hover:opacity-75 cursor-pointer">
            <div class="font-base text-[28px] text-blue-extra-light/75">View all</div>
            <img src="assets/Icons/ArrowRight.svg" width="28px" height="28px" />
          </div>
        </div>
        <div class="w-full pr-[100px]">
          <app-tv-song-table
            [songs]="songs"
            (play)="playSong($event)"
            (addToQueue)="addSongToQueue($event)"
            (remove)="removeSong($event)"
          ></app-tv-song-table>
        </div>
      </div>
      <div>
        <div class="font-semibold text-[40px] text-white mt-10 select-none">Favorite Albums</div>

        <div class="flex w-full select-none gap-8 pt-4 pr-5">
          <!-- We only want to navigate to only 1 album, others are just for decoration -->
          <app-tv-lib-card
            class="cursor-pointer"
            *ngFor="let album of favAlbums"
            [playlistName]="album.name"
            [tracks]="album.noTracks"
            [imgUrl]="'assets/images/albums/' + album.image"
          ></app-tv-lib-card>

          <app-tv-lib-card
            *ngIf="aviciiStories.name"
            routerLink="/tv/album/{{ aviciiStories._id }}"
            class="cursor-pointer"
            [playlistName]="aviciiStories.name"
            [tracks]="aviciiStories.noTracks"
            [imgUrl]="'assets/images/albums/' + aviciiStories.image"
          ></app-tv-lib-card>
        </div>
      </div>
    </div>
  `,
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
    private queueService: QueueService,
    private songPlayingService: SongPlayingService,
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

    this.socketService.subscribe('updateFavoriteSong', (song: SongModel) => {
      if (song.isFavorite) this.songs.push(song);
      else this.songs = this.songs.filter((favSong) => favSong._id !== song._id);
    });
  }

  playSong = (song: SongModel) => this.songPlayingService.setSongPlaying(song);

  addSongToQueue = (song: SongModel) => this.queueService.append(song);

  removeSong(song: SongModel): void {
    song.isFavorite = !song.isFavorite;
    this.songsService.updateSong(song).subscribe();
    this.socketService.publish('updateFavoriteSong', song);
  }
}
