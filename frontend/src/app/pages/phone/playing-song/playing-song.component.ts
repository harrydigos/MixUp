import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { PhoneNavbarState } from 'src/app/global/models/navbar/phoneNavbarState.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-playing-song',
  templateUrl: './playing-song.component.html',
  styleUrls: ['./playing-song.component.scss'],
})
export class PlayingSongComponent implements OnInit {
  navState: PhoneNavbarState = 'hide';

  @Input() song: string = 'Blinding Lights';
  @Input() artist: string = 'The Weeknd';
  @Input() album: string = 'After Hours';

  @Input() playlistName: string = '';
  @Input() tracks: number = 0;
  @Input() imgUrl: string = '';

  songTimeStart: string = '00:00';
  songTimeEnd: string = '03:50';
  lyricsSmall = true;
  lyricsBig = false;
  showImage = true;
  surroundWallOpen = false;
  surroundWallText: string = 'closed';

  SurroundWall(songTitle: string) {
    if (this.surroundWallOpen) {
      this.surroundWallOpen = false;
      this.surroundWallText = 'closed';
    } else {
      this.surroundWallOpen = true;
      this.surroundWallText = 'open';
    }
  }

  lyricsClose() {
    this.lyricsBig = false;
    this.lyricsSmall = true;
    this.showImage = true;
  }

  lyricsOpen() {
    this.lyricsSmall = false;
    this.lyricsBig = true;
    this.showImage = false;
  }

  back(): void {
    this.location.back();
  }

  

  constructor(private location: Location) {}

  ngOnInit(): void {
    environment.songPlaying = true;
  }
}
