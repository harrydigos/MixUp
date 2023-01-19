import { Component, OnInit } from '@angular/core';
import { AlbumDummyModel } from 'src/app/global/models';
import { TvNavbarStateService } from 'src/app/global/services';
import { GENRES, recentSearches } from 'src/app/global/utils';

@Component({
  selector: 'app-search',
  template: `
    <div class="hide-scrollbar relative h-screen w-screen overflow-x-hidden bg-blue-dark">
      <button
        class="fixed top-14 left-1/2 z-10 flex -translate-x-1/2 select-none items-center justify-center gap-4 rounded-full bg-blue/60 px-8 py-3 transition hover:bg-blue focus:outline-none focus:ring focus:ring-blue-light"
      >
        <img src="assets/Icons/Microphone.svg" width="48px" height="48px" />
        <div class="text-2xl font-medium text-white">Search</div>
      </button>

      <div class="relative w-full py-[100px] pl-[280px]">
        <div class="select-none text-[40px] font-semibold text-white">Genres</div>
        <app-card-wrapper>
          <app-tv-genre-card
            *ngFor="let card of genres"
            [genre]="card.name"
            [imgUrl]="'assets/images/genres/' + card.image"
          ></app-tv-genre-card>
        </app-card-wrapper>
        <div>
          <div class="mt-10 select-none text-[40px] font-semibold text-white">Recent Searches</div>
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
  genres = GENRES;
  recentSearches: AlbumDummyModel[] = recentSearches;

  constructor(private navbarState: TvNavbarStateService) {
    this.navbarState.setNavState('search');
  }

  ngOnInit(): void {}
}
