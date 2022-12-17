import { Component, Input, OnInit } from '@angular/core';
import { TvNavbarState } from 'src/app/global/models';

@Component({
  selector: 'app-tv-navbar',
  template: `
    <nav *ngIf="page !== 'hide'" class="relative top-0 left-0 z-50 h-full w-full select-none">
      <div class="fixed top-0 p-[100px] h-full flex flex-col justify-between">
        <button routerLink="/tv/home">
          <img src="assets/logo.svg" />
        </button>
        <div class="flex flex-col gap-6">
          <button
            *ngIf="page === 'home'; else elseHome"
            routerLink="/tv/home"
            class="flex h-20 w-20 items-center justify-center rounded-xl p-4 group bg-blue"
          >
            <img
              class="duration-100 group-hover:rotate-12"
              src="assets/Icons/HomeBulk.svg"
              width="48px"
              height="48px"
            />
          </button>
          <ng-template #elseHome>
            <button routerLink="/tv" class="flex h-20 w-20 items-center justify-center rounded-xl p-4 group bg-blue">
              <img
                class="duration-100 group-hover:rotate-12"
                src="assets/Icons/HomeTwotone.svg"
                width="48px"
                height="48px"
              />
            </button>
          </ng-template>

          <button
            *ngIf="page === 'search'; else elseSearch"
            routerLink="/tv/search"
            class="flex h-20 w-20 items-center justify-center rounded-xl p-4 group bg-blue"
          >
            <img
              class="duration-100 group-hover:rotate-12"
              src="assets/Icons/SearchBulk.svg"
              width="48px"
              height="48px"
            />
          </button>
          <ng-template #elseSearch>
            <button
              routerLink="/tv/search"
              class="flex h-20 w-20 items-center justify-center rounded-xl p-4 group bg-blue"
            >
              <img
                class="duration-100 group-hover:rotate-12"
                src="assets/Icons/SearchTwotone.svg"
                width="48px"
                height="48px"
              />
            </button>
          </ng-template>
          <button
            *ngIf="page === 'library'; else elseLibrary"
            routerLink="/tv/library"
            class="flex h-20 w-20 items-center justify-center rounded-xl p-4 group bg-blue"
          >
            <img
              class="duration-100 group-hover:rotate-12"
              src="assets/Icons/LibraryBulk.svg"
              width="48px"
              height="48px"
            />
          </button>
          <ng-template #elseLibrary>
            <button
              routerLink="/tv/library"
              class="flex h-20 w-20 items-center justify-center rounded-xl p-4 group bg-blue"
            >
              <img
                class="duration-100 group-hover:rotate-12"
                src="assets/Icons/LibraryTwotone.svg"
                width="48px"
                height="48px"
              />
            </button>
          </ng-template>
        </div>
        <img src="assets/images/profile.jpg" class="h-20 w-20 cursor-pointer rounded-full object-cover object-center" />
      </div>
    </nav>
  `,
})
export class TvNavbarComponent implements OnInit {
  @Input() page: TvNavbarState = 'home';

  constructor() {}

  ngOnInit(): void {}
}
