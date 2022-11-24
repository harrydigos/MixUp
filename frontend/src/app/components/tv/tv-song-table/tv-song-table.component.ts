import { Component, Input, OnInit } from '@angular/core';

type SongTableProps = {
  title: string;
  artist: string;
  album: string;
  duration: string;
  img?: string;
};

@Component({
  selector: 'app-tv-song-table',
  templateUrl: './tv-song-table.component.html',
  styleUrls: ['./tv-song-table.component.scss'],
})
export class TvSongTableComponent implements OnInit {
  @Input() songs: SongTableProps[] = [];

  constructor() {}

  ngOnInit(): void {}
}
