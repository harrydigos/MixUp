import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SongModel } from 'src/app/global/models';

@Component({
  selector: 'app-song-list-favorites',
  templateUrl: './song-list-favorites.component.html',
  styleUrls: ['./song-list-favorites.component.scss'],
})
export class SongListFavoritesComponent implements OnInit {
  @Input() song = {} as SongModel;

  @Output() Song2open = new EventEmitter<SongModel>();
  @Output() Song2queue = new EventEmitter<SongModel>();
  @Output() removeSongFromFavorites = new EventEmitter<SongModel>();

  openSong(song: SongModel) {
    this.Song2open.emit(song);
  }

  songQueueAdded(song: SongModel) {
    this.Song2queue.emit(song);
  }

  removefavorites(song: SongModel) {
    this.removeSongFromFavorites.emit(song);
  }

  constructor() {}

  ngOnInit(): void {}
}
