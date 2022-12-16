import { Component, Input, OnInit } from '@angular/core';
import { SongModel } from '../../../global/models';
import { SocketsService, SongsService } from '../../../global/services';

@Component({
  selector: 'app-tv-song-table',
  templateUrl: './tv-song-table.component.html',
  styleUrls: ['./tv-song-table.component.scss'],
})
export class TvSongTableComponent implements OnInit {
  @Input() songs: SongModel[] = [];

  constructor(private songsService: SongsService, private socketService: SocketsService) {}

  ngOnInit(): void {
    this.socketService.subscribe('updateFavoriteSong', (song: SongModel) => {
      if (song.isFavorite) this.songs.push(song);
      else this.songs = this.songs.filter((favSong) => favSong._id !== song._id);
    });
  }

  toggleFavorite(song: SongModel): void {
    song.isFavorite = !song.isFavorite;
    this.songsService.updateSong(song).subscribe();
    this.socketService.publish('updateFavoriteSong', song);
  }

  getTimeOfSong(duration: number): string {
    let [minutes, seconds] = duration.toString().split('.');
    seconds.length === 1 ? (seconds += '0') : null;
    return `${minutes}:${seconds}`;
  }
}
