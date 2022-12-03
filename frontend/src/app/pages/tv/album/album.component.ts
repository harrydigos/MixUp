import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarStateService } from 'src/app/global/services';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
})
export class AlbumComponent implements OnInit {
  constructor(
    private navbarState: NavbarStateService,
    private location: Location
  ) {
    this.navbarState.setNavState('hide');
  }

  ngOnInit(): void {}

  back() {
    this.location.back();
  }
}
