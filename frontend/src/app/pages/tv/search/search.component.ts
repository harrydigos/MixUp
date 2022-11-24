import { Component, OnInit } from '@angular/core';
import { TvService } from 'src/app/services/tv.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  constructor(private tvService: TvService) {
    this.tvService.setNavState('search');
  }

  ngOnInit(): void {}
}
