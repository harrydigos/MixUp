import { Component, OnInit ,Input } from '@angular/core';
import { PhoneNavbarState } from 'src/app/global/models/navbar/phoneNavbarState.model';
import { genres, recentSearches } from 'src/app/global/utils';
import { AlbumDummyModel } from 'src/app/global/models';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  navState: PhoneNavbarState = 'search';

  genres = genres;
  recentSearches: AlbumDummyModel[] = recentSearches;

  @Input() searchText: string = 'Albums, songs or playlists';
  displayValue:string ='';

  getvalue(val:string){
    this.displayValue=val;
    this.checksearch(val);
  }

  checksearch(displayValue:string){
    if (displayValue=="the weeknd" || displayValue=="The Weeknd" || displayValue=="Weeknd") {
      this.displayValue = "Show Results for 'The Weeknd' ";
      
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
