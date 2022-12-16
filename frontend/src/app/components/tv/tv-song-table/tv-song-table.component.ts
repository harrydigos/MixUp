import { Component, Input, OnInit } from '@angular/core';

type SongTableProps = {
  title: string;
  artist: string;
  album: string;
  duration: string;
  isFavorite: boolean;
  image: string;
};

@Component({
  selector: 'app-tv-song-table',
  templateUrl: './tv-song-table.component.html',
  styleUrls: ['./tv-song-table.component.scss'],
})
export class TvSongTableComponent implements OnInit {
  @Input() songs: SongTableProps[] = [];

  songsFiltered: SongTableProps[] = [];

  constructor() {}

  ngOnInit(): void {
    this.songsFiltered = this.songs.slice(0, 5);
  }

  toggleFavorite(song: SongTableProps): void {
    song.isFavorite = !song.isFavorite;
  }
}
