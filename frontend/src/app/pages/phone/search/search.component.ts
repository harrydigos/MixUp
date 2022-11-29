import { Component, OnInit ,Input } from '@angular/core';
import { divide } from 'lodash';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

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
