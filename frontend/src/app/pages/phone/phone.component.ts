import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NavbarState } from 'src/app/global/models';
import { PhoneNavbarStateService } from 'src/app/global/services';

@Component({
  selector: 'app-phone',
  template: `
    <app-ph-navbar [page]="navState"></app-ph-navbar>
    <app-song-active [active]="activeSong"></app-song-active>
    <router-outlet></router-outlet>
  `,
})
export class PhoneComponent implements OnInit {
  navState: NavbarState = 'home';
  activeSong: boolean = false;

  constructor(private navbarState: PhoneNavbarStateService, private router: Router) {}

  ngOnInit(): void {
    this.navbarState.navState$.subscribe((event) => (this.navState = event));

    // If the user is on the play page, then the songActive component should not be displayed
    this.router.events.subscribe((event) => {
      event instanceof NavigationEnd && event.url.includes('phone/play/')
        ? (this.activeSong = false)
        : (this.activeSong = true);
    });
  }
}
