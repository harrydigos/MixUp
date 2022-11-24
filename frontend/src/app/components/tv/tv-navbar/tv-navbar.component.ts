import { Component, Input, OnInit } from '@angular/core';
import { TvNavbarState } from 'src/app/models/tvNavbarState';

@Component({
  selector: 'app-tv-navbar',
  templateUrl: './tv-navbar.component.html',
  styleUrls: ['./tv-navbar.component.scss'],
})
export class TvNavbarComponent implements OnInit {
  @Input() page: TvNavbarState = 'home';

  constructor() {}

  ngOnInit(): void {}
}
