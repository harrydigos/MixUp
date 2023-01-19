import { Component, Input } from '@angular/core';
import { NavbarState } from 'src/app/global/models';

@Component({
  selector: 'app-tv-navbar',
  template: `
    <nav *ngIf="page !== 'hide'" class="relative top-0 left-0 z-50 h-full w-full select-none">
      <div class="fixed top-0 flex h-full flex-col justify-between p-[100px]">
        <button routerLink="/tv/home">
          <img src="assets/logo.svg" />
        </button>
        <div class="flex flex-col gap-6">
          <button routerLink="/tv/home" class="group flex h-20 w-20 items-center justify-center rounded-xl bg-blue p-4">
            <img
              class="duration-100 group-hover:rotate-12"
              src="assets/Icons/Home{{ page === 'home' ? 'Bulk' : 'Twotone' }}.svg"
              width="48px"
              height="48px"
            />
          </button>

          <button
            routerLink="/tv/search"
            class="group flex h-20 w-20 items-center justify-center rounded-xl bg-blue p-4"
          >
            <img
              class="duration-100 group-hover:rotate-12"
              src="assets/Icons/Search{{ page === 'search' ? 'Bulk' : 'Twotone' }}.svg"
              width="48px"
              height="48px"
            />
          </button>

          <button
            routerLink="/tv/library"
            class="group flex h-20 w-20 items-center justify-center rounded-xl bg-blue p-4"
          >
            <img
              class="duration-100 group-hover:rotate-12"
              src="assets/Icons/Library{{ page === 'library' ? 'Bulk' : 'Twotone' }}.svg"
              width="48px"
              height="48px"
            />
          </button>
        </div>
        <img src="assets/images/profile.jpg" class="h-20 w-20 cursor-pointer rounded-full object-cover object-center" />
      </div>
    </nav>
  `,
})
export class TvNavbarComponent {
  @Input() page: NavbarState = 'home';

  constructor() {}
}
