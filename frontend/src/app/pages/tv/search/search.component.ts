import { Component, OnInit } from '@angular/core';
import { AlbumDummyModel } from 'src/app/global/models';
import { NavbarStateService } from 'src/app/global/services';
import { genres, recentSearches } from 'src/app/global/utils';

@Component({
  selector: 'app-search',
  template: `
    <div class="relative h-screen w-screen overflow-x-hidden bg-blue-dark hide-scrollbar">
      <button
        class="fixed top-14 left-1/2 z-10 flex -translate-x-1/2 items-center justify-center gap-4 rounded-full px-8 py-3 transition bg-blue/60 hover:bg-blue focus:ring-blue-light focus:outline-none focus:ring"
      >
        <img src="assets/Icons/Microphone.svg" width="48px" height="48px" />
        <div class="text-2xl font-medium text-white">Search</div>
      </button>

      <div class="relative w-full pl-[280px] py-[100px]">
        <div class="font-semibold text-[40px] text-white">Genres</div>
        <app-card-wrapper>
          <app-tv-genre-card
            *ngFor="let card of genres"
            [genre]="card.gerne"
            [imgUrl]="'assets/images/genres/' + card.image"
          ></app-tv-genre-card>
        </app-card-wrapper>
        <div>
          <div class="font-semibold text-[40px] text-white mt-10">Recent Searches</div>
          <app-card-wrapper>
            <app-tv-card
              *ngFor="let card of recentSearches"
              [album]="card.name"
              [artist]="card.artist"
              [imgUrl]="'assets/images/albums/' + card.image"
            ></app-tv-card>
          </app-card-wrapper>
        </div>
      </div>
    </div>
  `,
})
export class SearchComponent implements OnInit {
  genres = genres;
  recentSearches: AlbumDummyModel[] = recentSearches;

  constructor(private navbarState: NavbarStateService) {
    this.navbarState.setNavState('search');
  }

  ngOnInit(): void {}
}
