import { Component, OnInit } from '@angular/core';
import { AlbumModel } from 'src/app/global/models';
import { AlbumsService, TvNavbarStateService } from 'src/app/global/services';

@Component({
  selector: 'app-home',
  template: `
    <div class="hide-scrollbar relative h-screen w-screen overflow-x-hidden bg-blue-dark">
      <div class="min-w-1/2 absolute top-0 right-0 h-[60%]">
        <img class="h-full w-full select-none object-cover" src="assets/images/albums/the_car_quality.jpg" />
        <div class="absolute top-0 right-0 h-full w-full bg-gradient-to-r from-blue-dark to-transparent"></div>
        <div class="absolute right-0 bottom-0 h-1/2 w-full bg-gradient-to-t from-blue-dark to-transparent"></div>
      </div>

      <div class="relative w-full select-none py-[100px] pl-[280px]">
        <div>
          <div class="text-xl font-bold text-blue-light">STUDIO ALBUM</div>
          <div class="my-2 text-5xl font-bold text-white">The Car</div>
          <div class="mb-3 text-[32px] font-semibold text-blue-extra-light">Arctic Monkeys</div>
          <div class="w-[40%] text-xl text-white">
            The Car is the forthcoming seventh studio album by English rock band Arctic Monkeys. It was announced on 24
            August 2022, and scheduled for release on 21 October 2022.
          </div>
          <button
            class="mt-8 inline-block rounded-xl bg-blue-extra-light py-2 px-8 text-[32px] font-medium text-blue-dark transition hover:bg-blue-extra-light/75 focus:outline-none focus:ring focus:ring-blue"
          >
            Listen
          </button>
        </div>
        <div>
          <div class="mt-10 select-none text-[40px] font-semibold text-white">Latest Releases</div>
          <app-card-wrapper>
            <app-tv-card
              *ngFor="let card of latestReleases"
              [album]="card.name"
              [artist]="card.artist"
              [imgUrl]="'assets/images/albums/' + card.image"
            ></app-tv-card>
          </app-card-wrapper>

          <div class="mt-10 select-none text-[40px] font-semibold text-white">Recently Listened</div>
          <app-card-wrapper>
            <app-tv-card
              *ngFor="let card of recentlyPlayed"
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
export class HomeComponent implements OnInit {
  latestReleases: AlbumModel[] = [];
  recentlyPlayed: AlbumModel[] = [];

  constructor(private navbarState: TvNavbarStateService, private albumsService: AlbumsService) {
    this.navbarState.setNavState('home');
  }

  ngOnInit(): void {
    this.getAllAlbums();
  }

  private getAllAlbums(): void {
    this.albumsService.getAll().subscribe((result) => {
      this.latestReleases = result.slice(0, 6);
      this.recentlyPlayed = result.slice(6).filter((album) => !album.isFavorite);
    });
  }
}
