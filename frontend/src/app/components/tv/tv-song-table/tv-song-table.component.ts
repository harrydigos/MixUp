import { Component, Input, OnInit } from '@angular/core';
import { SongModel } from '../../../global/models';

@Component({
  selector: 'app-tv-song-table',
  templateUrl: './tv-song-table.component.html',
  styleUrls: ['./tv-song-table.component.scss'],
})
export class TvSongTableComponent implements OnInit {
  @Input() songs: SongModel[] = [];

  songsFiltered: SongModel[] = [];

  constructor() {}

  ngOnInit(): void {
    this.songsFiltered = this.songs.slice(0, 5);
  }

  toggleFavorite(song: SongModel): void {
    song.isFavorite = !song.isFavorite;
  }

  getTimeOfSong(duration: number): string {
    let [minutes, seconds] = duration.toString().split('.');
    seconds.length === 1 ? (seconds += '0') : null;
    return `${minutes}:${seconds}`;
  }
}
