import { Component, OnInit } from '@angular/core';
import { PhoneNavbarState } from 'src/app/global/models/navbar/phoneNavbarState.model';
import { playlists } from 'src/app/global/utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  navState: PhoneNavbarState = 'home';

  artist: string = '';
  song: string = '';
  imgUrl: string = '';

  savedPlaylists = playlists.filter((playlist) => playlist.saved);
  youMayLikePlaylists = playlists.filter((playlist) => !playlist.saved);


  constructor() { }

  ngOnInit(): void {
  }

}
