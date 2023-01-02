import { Component, OnInit } from '@angular/core';
import { SongModel } from 'src/app/global/models';
import { SocketsService, SongPlayingService } from 'src/app/global/services';

@Component({
  selector: 'app-lyrics',
  templateUrl: './lyrics.component.html',
  styleUrls: ['./lyrics.component.scss'],
})
export class LyricsComponent implements OnInit {
  
  song: SongModel = {} as SongModel;
  songPlaying: SongModel = {} as SongModel;

  isBold: boolean = true;
  wallIsOpen: boolean = false;
  isPlaying: boolean = false;
  songTimeStart: number = 0;
  songTimeEnd: number = 0;
  songCurrentTime: number = 0;

  lyricStart: number = 0;
  lyricEnd: number = 5;
  counter: number = 4;

  lyrics: any[] = [
    { line: 0, start: 27, end: 30, text: "I've been tryna call" },
    { line: 1, start: 30, end: 33, text: "I've been on my own for long enough" },
    { line: 2, start: 33, end: 38, text: 'Maybe you can show me how to love, maybe' },
    { line: 3, start: 38, end: 41, text: "I'm going through withdrawals" },
    { line: 4, start: 41, end: 44, text: "You don't even have to do too much" },

    { line: 5, start: 44, end: 49, text: 'You can turn me on with just a touch, baby' },
    { line: 6, start: 49, end: 53, text: "I look around and Sin City's cold and empty" },
    { line: 7, start: 53, end: 56, text: "No one's around to judge me" },
    { line: 8, start: 56, end: 60, text: "I can't see clearly when you're gone" },
    { line: 9, start: 60, end: 66, text: "I said, ooh, I'm blinded by the lights" },

    { line: 10, start: 66, end: 72, text: "No, I can't sleep until I feel your touch" },
    { line: 11, start: 72, end: 77, text: "I said, ooh, I'm drowning in the night" },
    { line: 12, start: 77, end: 94, text: "Oh, when I'm like this, you're the one I trust" },
    { line: 13, start: 94, end: 97, text: "I'm running out of time" },
    { line: 14, start: 97, end: 99, text: 'Cause I can see the sun light up the sky' },

    { line: 15, start: 99, end: 105, text: 'So I hit the road in overdrive, baby' },
    { line: 16, start: 105, end: 109, text: "Oh, the city's cold and empty" },
    { line: 17, start: 109, end: 112, text: "No one's around to judge me" },
    { line: 18, start: 112, end: 117, text: "I can't see clearly when you're gone" },
    { line: 19, start: 117, end: 122, text: "I said, ooh, I'm blinded by the lights" },

    { line: 20, start: 122, end: 128, text: "No, I can't sleep until I feel your touch" },
    { line: 21, start: 128, end: 133, text: "I said, ooh, I'm drowning in the night" },
    { line: 22, start: 133, end: 135, text: "Oh, when I'm like this" },
    { line: 23, start: 135, end: 140, text: "You're the one I trust" },
    { line: 24, start: 140, end: 142, text: "I'm just walking by to let you know" },

    { line: 25, start: 142, end: 145, text: 'I can never say it on the phone' },
    { line: 26, start: 145, end: 150, text: 'Will never let you go this time' },
    { line: 27, start: 150, end: 156, text: "I said, ooh, I'm blinded by the lights" },
    { line: 28, start: 156, end: 161, text: "No, I can't sleep until I feel your touch" },
    { line: 29, start: 161, end: 172, text: 'Hey, hey, hey' },

    { line: 30, start: 172, end: 184, text: 'Hey, hey, hey' },
    { line: 31, start: 184, end: 190, text: "I said, ooh, I'm blinded by the lights" },
    { line: 32, start: 190, end: 198, text: "No, I can't sleep until I feel your touch" },
    { line: 33, start: 198, end: 204, text: "..." },
    { line: 34, start: 200, end: 204, text: "" },
  ];

  activeLyric(line: number) {
    for (let index = 0; index < line; index++) {
      this.lyrics[index].active = true;
    }
    if (this.lyrics[line].active == true) {
      this.lyrics[line].active = false;
    } else {
      this.lyrics[line].active = true;
    }
  }

  constructor(private songPlayingService: SongPlayingService,private socketsService: SocketsService,) {}

  ngOnInit(): void {
    this.socketsService.subscribe('wallIsOpen', (isOpen: boolean) => (this.wallIsOpen = isOpen));
    this.songPlayingService.songPlaying$.subscribe((song) => (this.songPlaying = song));
    this.songPlayingService.isPlaying$.subscribe((isPlaying) => (this.isPlaying = isPlaying));

    this.songPlayingService.currentTime$.subscribe((time) => {
      this.songCurrentTime = time;

      if (this.songCurrentTime > this.lyrics[this.counter].end) {
        this.counter += 5; //counter for array of lyrics
        this.lyricStart += 5; //make 5 lyrics appear on the screen
        this.lyricEnd += 5;
      }
    });
  }
}
