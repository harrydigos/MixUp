import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SongModel } from 'src/app/global/models';

@Component({
  selector: 'app-tv-song-table',
  template: `<table class="w-full table-fixed border-separate border-spacing-y-4">
    <thead>
      <tr class="select-none text-left text-xl font-semibold text-blue-light">
        <th class="w-20"></th>
        <th class="pl-6">Title</th>
        <th>Artist</th>
        <th>Album</th>
        <th>Time</th>
        <th class="h-8 w-8"></th>
      </tr>
    </thead>
    <tbody>
      <tr
        *ngFor="let song of songs.slice(0, 5)"
        class="h-full cursor-pointer select-none text-2xl font-medium text-white delay-75 duration-100 ease-out hover:bg-blue/20"
      >
        <td class="h-full rounded-l-xl">
          <img
            draggable="false"
            class="w-20 h-20 rounded-[10px] object-cover"
            src="assets/images/songs/{{ song.image }}"
          />
        </td>
        <td class="pl-6 duration-100 group-hover:bg-blue/30">{{ song.title }}</td>
        <td>{{ song.artist }}</td>
        <td>
          <div class="w-fit hover:underline">{{ song.album }}</div>
        </td>
        <td>{{ getTimeOfSong(song.duration) }}</td>
        <td class="rounded-r-xl">
          <img
            class="transition-transform duration-100 hover:scale-110"
            *ngIf="song.isFavorite"
            (click)="removeSongFromFavorites(song)"
            src="assets/Icons/Heart.svg"
            width="32px"
            height="32px"
          />
        </td>
      </tr>
    </tbody>
  </table> `,
})
export class TvSongTableComponent implements OnInit {
  @Input() songs: SongModel[] = [];
  @Output() remove = new EventEmitter<SongModel>();

  constructor() {}

  ngOnInit(): void {}

  removeSongFromFavorites = (song: SongModel) => this.remove.emit(song);

  getTimeOfSong = (duration: number): string => {
    let [minutes, seconds] = duration.toString().split('.');
    seconds.length === 1 ? (seconds += '0') : null;
    return `${minutes}:${seconds}`;
  };
}
