import { Component, OnInit } from '@angular/core';
import { TvService } from 'src/app/services/tv.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss'],
})
export class PlaylistsComponent implements OnInit {
  constructor(private tvService: TvService) {
    this.tvService.setLibraryNavState('playlists');
  }

  ngOnInit(): void {}
}
