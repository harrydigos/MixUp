import { Component, OnInit } from '@angular/core';
import { LibraryNavState } from 'src/app/global/models';
import { TvNavbarStateService } from 'src/app/global/services';

@Component({
  selector: 'app-library',
  template: `
    <div class="hide-scrollbar relative h-screen w-screen overflow-x-hidden bg-blue-dark">
      <div class="relative w-full py-[100px] pl-[280px]">
        <div class="flex items-center gap-[100px]">
          <div class="select-none text-[56px] font-semibold text-white">Library</div>
          <div class="relative">
            <div class="toggleSelector" [ngClass]="libraryNavState === 'favorites' ? 'favorites' : 'playlists'"></div>
            <div
              class="flex h-[60px] w-[400px] select-none items-center overflow-hidden rounded-full bg-blue/25 text-[32px] font-medium"
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
  libraryNavState: LibraryNavState = 'favorites';

  constructor(private navbarState: TvNavbarStateService) {
    this.navbarState.setNavState('library');
  }

  ngOnInit(): void {
    this.navbarState.libraryNavState$.subscribe((event) => (this.libraryNavState = event));
  }
}
