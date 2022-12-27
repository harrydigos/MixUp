import { Component, OnInit } from '@angular/core';
import { SongModel } from 'src/app/global/models';
import { SocketsService, SongPlayingService } from 'src/app/global/services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-song-active',
  templateUrl: './song-active.component.html',
  styleUrls: ['./song-active.component.scss']
})
export class SongActiveComponent implements OnInit {


  imgUrl:string = 'assets/images/albums/blinding_lights.jpg';
  song: string = "Blinding Lights";
  artist:string = "The Weeknd";

  isPlaying: boolean = false;
  songPlaying: SongModel = {} as SongModel;


  constructor(private socketsService: SocketsService,private songPlayingService: SongPlayingService,) { }

  ngOnInit(): void {
        
    this.songPlayingService.songPlaying$.subscribe((song) => (this.songPlaying = song));
    this.songPlayingService.isPlaying$.subscribe((isPlaying) => (this.isPlaying = isPlaying));
  }

}
