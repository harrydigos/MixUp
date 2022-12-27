import { Component, OnInit } from '@angular/core';
import { SocketsService } from 'src/app/global/services';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss'],
})
export class WallComponent implements OnInit {
  song_title: string = 'Blinding Lights'; //Might change this with database later
  song_artist: string = 'The Weeknd';
  isOpen: boolean = false;
  songPlaying: boolean = false;

  lyrics: string[] = [
    "I've been on my own for long enough",
    'Maybe you can show me how to love, maybe',
    "I'm going through withdrawals",
  ];

  constructor(private socketsService: SocketsService) {}

  ngOnInit(): void {
    this.socketsService.subscribe('wallIsOpen', (isOpen: boolean) => (this.isOpen = isOpen));
    this.socketsService.subscribe('songPlaying', (songPlaying: boolean) => (this.songPlaying = songPlaying));
  }
}
