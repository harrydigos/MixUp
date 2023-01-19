import { Component, Input } from '@angular/core';
import { NavbarState } from 'src/app/global/models';

@Component({
  selector: 'app-ph-navbar',
  template: `
    <nav *ngIf="page !== 'hide'" class="relative z-50">
      <div class="fixed bottom-0 flex h-16 w-full items-center border-t-2 border-blue bg-blue-dark">
        <div class="flex w-full justify-around text-xs font-normal">
          <button routerLink="/phone/home" class="flex flex-col items-center">
            <img
              class="py-1"
              src="assets/Icons/Home{{ page === 'home' ? 'Bulk' : 'Twotone' }}.svg"
              width="24px"
              height="24px"
            />
            <p [ngClass]="page === 'home' ? 'text-[#A5C9CA]' : 'text-white'">Home</p>
          </button>

          <button routerLink="/phone/search" class="flex flex-col items-center">
            <img
              class="py-1"
              src="assets/Icons/Search{{ page === 'search' ? 'Bulk' : 'Twotone' }}.svg"
              width="24px"
              height="24px"
            />
            <p [ngClass]="page === 'search' ? 'text-[#A5C9CA]' : 'text-white'">Search</p>
          </button>

          <button routerLink="/phone/favorites" class="flex flex-col items-center">
            <img
              class="py-1"
              src="assets/Icons/Library{{ page === 'library' ? 'Bulk' : 'Twotone' }}.svg"
              width="24px"
              height="24px"
            />
            <p [ngClass]="page === 'library' ? 'text-[#A5C9CA]' : 'text-white'">Library</p>
          </button>
        </div>
      </div>
    </nav>
  `,
})
export class PhNavbarComponent {
  @Input() page: NavbarState = 'home';

  constructor() {}
}
