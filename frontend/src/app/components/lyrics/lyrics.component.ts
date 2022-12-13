import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lyrics',
  templateUrl: './lyrics.component.html',
  styleUrls: ['./lyrics.component.scss']
})
export class LyricsComponent implements OnInit {

  isBold:boolean = true;

  setActiveLyric(active:boolean){
    switch (active) {
      case false:
        return '#191919'
      case true:
        return 'white'
    }
  }

  lyrics = [
    {"line":0,"text":"I've been tryna call",active:false},
    {"line":1,"text":"I've been on my own for long enough",active:false},
    {"line":2,"text":"Maybe you can show me how to love, maybe",active:false},
    {"line":3,"text":"I'm going through withdrawals",active:false},
    {"line":4,"text":"You don't even have to do too much",active:false},
    // {"line":5,"text":"You can turn me on with just a touch, baby",active:false}
  ]

  activeLyric(line:number){
    for (let index = 0; index < line; index++) {
      this.lyrics[index].active = true;
    }
    if(this.lyrics[line].active == true){
      this.lyrics[line].active = false;
    }else{
      this.lyrics[line].active = true;
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
