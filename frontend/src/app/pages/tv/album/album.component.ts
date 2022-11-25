import { Component, OnInit } from '@angular/core';
import { TvService } from 'src/app/services/tv.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
})
export class AlbumComponent implements OnInit {
  constructor(private tvService: TvService) {
    this.tvService.setNavState('hide');
  }

  ngOnInit(): void {}
}
