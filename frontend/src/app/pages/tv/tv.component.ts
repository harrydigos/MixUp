import { Component, OnInit } from '@angular/core';
import { TvNavbarState } from 'src/app/global/models';
import { NavbarStateService } from 'src/app/global/services';

@Component({
  selector: 'app-tv',
  template: `
    <app-tv-navbar [page]="navState"></app-tv-navbar>
    <router-outlet></router-outlet>
  `,
})
export class TVComponent implements OnInit {
  navState: TvNavbarState = 'home';

  constructor(private navbarState: NavbarStateService) {}

  ngOnInit(): void {
    this.navbarState.navState$.subscribe((event) => (this.navState = event));
  }
}
