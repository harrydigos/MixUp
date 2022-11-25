import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TvService } from 'src/app/services/tv.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
})
export class AlbumComponent implements OnInit {
  constructor(private tvService: TvService, private location: Location) {
    this.tvService.setNavState('hide');
  }

  ngOnInit(): void {}

  back() {
    this.location.back();
  }
}
