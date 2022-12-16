import { Component, OnInit } from '@angular/core';
import { AlbumModel } from 'src/app/global/models';
import { AlbumsService, NavbarStateService } from 'src/app/global/services';

@Component({
  selector: 'app-home',
  template: `
    <div class="relative h-screen w-screen overflow-x-hidden bg-blue-dark hide-scrollbar">
      <div class="absolute top-0 right-0 h-[60%] min-w-1/2">
        <img class="h-full w-full object-cover" src="\\assets\\theCar.jpg" />
        <div class="absolute top-0 right-0 h-full w-full bg-gradient-to-r to-transparent from-blue-dark"></div>
        <div class="absolute right-0 bottom-0 h-1/2 w-full bg-gradient-to-t to-transparent from-blue-dark"></div>
      </div>

      <div class="relative w-full pl-[280px] py-[100px]">
        <div>
          <div class="text-xl font-bold text-blue-light">STUDIO ALBUM</div>
          <div class="my-2 text-5xl font-bold text-white">The Car</div>
          <div class="font-semibold text-[32px] text-blue-extra-light mb-3">Arctic Monkeys</div>
          <div class="w-[40%] text-xl text-white">
            The Car is the forthcoming seventh studio album by English rock band Arctic Monkeys. It was announced on 24
            August 2022, and scheduled for release on 21 October 2022.
          </div>
          <button
            class="inline-block mt-8 py-2 px-8 bg-blue-extra-light rounded-xl text-blue-dark font-medium text-[32px] transition hover:bg-blue-extra-light/75 focus:outline-none focus:ring focus:ring-blue"
          >
            Listen
          </button>
        </div>
        <div>
          <div class="font-semibold text-[40px] text-white mt-10">Latest Releases</div>
          <app-card-wrapper>
            <app-tv-card
              *ngFor="let card of latestReleases"
              [album]="card.name"
              [artist]="card.artist"
              [imgUrl]="'assets/images/albums/' + card.image"
            ></app-tv-card>
          </app-card-wrapper>

          <div class="font-semibold text-[40px] text-white mt-10">Recently Listened</div>
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

  constructor(private navbarState: NavbarStateService, private albumsService: AlbumsService) {
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
