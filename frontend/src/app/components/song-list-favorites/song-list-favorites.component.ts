import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-song-list-favorites',
  templateUrl: './song-list-favorites.component.html',
  styleUrls: ['./song-list-favorites.component.scss'],
})
export class SongListFavoritesComponent implements OnInit {
  @Input() artist: string = '';
  @Input() imgUrl: string = '';
  @Input() song: string = '';

  //Check if song is blinding lights and open it
  allowSongToPlay = false;

  @Output() Song2open = new EventEmitter<string>();
  @Output() Song2queue = new EventEmitter<string>();

  openSong(title: string) {
    this.Song2open.emit(title);
    if(title === "Blinding Lights"){
      this.allowSongToPlay = true;
      this._router.navigate(['/phone/play'])
    }
  }

  songQueueAdded(title: string) {
    this.Song2queue.emit(title);
  }

  //If we will implement song remove from favorites library

  @Output() removeSongFromFavorites = new EventEmitter<string>();

  removeSongFav(val: string) {
    this.removeSongFromFavorites.emit(val);
  }

  removefavorites(title: string) {
    this.removeSongFav(title);
  }

  constructor(private _router: Router) {}

  ngOnInit(): void {}
}
