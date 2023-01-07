import { Component, OnInit, Input } from '@angular/core';
import { genres, recentSearches } from 'src/app/global/utils';
import { AlbumDummyModel, NavbarState } from 'src/app/global/models';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  navState: NavbarState = 'search';

  songPlaying: boolean = false;

  genres = genres;
  recentSearches: AlbumDummyModel[] = recentSearches;

  @Input() searchText: string = 'Albums, songs or playlists';
  displaySearchValue: string = 'blank';

  getvalue(val: string) {
    this.displaySearchValue = val;
    this.checksearch(val);
  }

  checksearch(displaySearchValue: string) {
    if (
      displaySearchValue == 'the weeknd' ||
      displaySearchValue == 'The Weeknd' ||
      displaySearchValue == 'Weeknd' ||
      displaySearchValue == 'weeknd'
    ) {
      //only in the weeknd results
      this.displaySearchValue = "Showing results for '" + displaySearchValue + "'";
    } else {
      this.displaySearchValue = "Showing results for '" + displaySearchValue + "'";
    }
  }

  constructor() {}

  ngOnInit(): void {}
}
