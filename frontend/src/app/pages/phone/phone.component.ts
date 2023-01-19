import { Component, OnInit } from '@angular/core';
import { NavbarState } from 'src/app/global/models';
import { PhoneNavbarStateService } from 'src/app/global/services';

@Component({
  selector: 'app-phone',
  template: `
    <app-ph-navbar [page]="navState"></app-ph-navbar>
    <router-outlet></router-outlet>
  `,
})
export class PhoneComponent implements OnInit {
  navState: NavbarState = 'home';

  constructor(private navbarState: PhoneNavbarStateService) {}

  ngOnInit(): void {
    this.navbarState.navState$.subscribe((event) => (this.navState = event));
  }
}
