import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tv-navbar',
  templateUrl: './tv-navbar.component.html',
  styleUrls: ['./tv-navbar.component.scss'],
})
export class TvNavbarComponent implements OnInit {
  @Input() page: 'home' | 'search' | 'library' | 'hide' = 'home';

  constructor() {}

  ngOnInit(): void {
    console.log(this.page);
  }
}
