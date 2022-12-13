import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-song-active',
  templateUrl: './song-active.component.html',
  styleUrls: ['./song-active.component.scss']
})
export class SongActiveComponent implements OnInit {

  songPlayingBool = environment.songPlaying;

  imgUrl:string = 'assets/images/albums/blinding_lights.jpg';
  song: string = "Blinding Lights";
  artist:string = "The Weeknd";

  constructor() { }

  ngOnInit(): void {
  }

}
