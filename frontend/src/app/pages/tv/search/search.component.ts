import { Component, OnInit } from '@angular/core';
import { AlbumDummyModel } from 'src/app/global/models';
import { NavbarStateService } from 'src/app/global/services';
import { genres, recentSearches } from 'src/app/global/utils';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  genres = genres;
  recentSearches: AlbumDummyModel[] = recentSearches;

  constructor(private navbarState: NavbarStateService) {
    this.navbarState.setNavState('search');
  }

  ngOnInit(): void {}
}
