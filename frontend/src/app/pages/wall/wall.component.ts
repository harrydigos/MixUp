import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})
export class WallComponent implements OnInit {

  song_title:  string = "Blinding Lights"; //Might change this with database later
  song_artist: string = "The Weeknd";

  lyrics: string[] = [];

  constructor() { 
    this.lyrics.push("I've been on my own for long enough");
    this.lyrics.push("Maybe you can show me how to love, maybe");
    this.lyrics.push("I'm going through withdrawals");
  }

  ngOnInit(): void {
  }

}
