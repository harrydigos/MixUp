import { Component, OnInit } from '@angular/core';
import { NavbarStateService } from 'src/app/global/services';

@Component({
  selector: 'app-library',
  template: `
    <div class="relative h-screen w-screen overflow-x-hidden bg-blue-dark hide-scrollbar">
      <div class="relative w-full pl-[280px] py-[100px]">
        <div class="flex items-center gap-[100px]">
          <div class="font-semibold text-[56px] text-white select-none">Library</div>
          <div class="relative">
            <div class="toggleSelector" [ngClass]="libraryNavState === 'favorites' ? 'favorites' : 'playlists'"></div>
            <div
              class="flex items-center w-[400px] h-[60px] rounded-full bg-blue/25 text-[32px] font-medium select-none overflow-hidden"
            >
              <button
                routerLink="/tv/library/favorites"
                class="z-10 flex h-full w-1/2 items-center justify-center rounded-full text-blue-extra-light"
              >
                Favorites
              </button>
              <button
                routerLink="/tv/library/playlists"
                class="z-10 flex h-full w-1/2 items-center justify-center rounded-full text-blue-extra-light"
              >
                Playlists
              </button>
            </div>
          </div>
        </div>
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent implements OnInit {
  libraryNavState: 'favorites' | 'playlists' = 'favorites';

  constructor(private navbarState: NavbarStateService) {
    this.navbarState.setNavState('library');
  }

  ngOnInit(): void {
    this.navbarState.libraryNavState$.subscribe((event) => (this.libraryNavState = event));
  }
}
