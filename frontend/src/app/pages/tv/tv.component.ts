import { Component, OnInit } from '@angular/core';
import { SongModel, TvNavbarState } from 'src/app/global/models';
import { NavbarStateService, SocketsService, SongPlayingService } from 'src/app/global/services';

@Component({
  selector: 'app-tv',
  template: `
    <app-tv-navbar [page]="navState"></app-tv-navbar>
    <router-outlet></router-outlet>
    <div *ngIf="songPlaying._id" class="fixed bottom-0 w-screen h-[76px] songPlaying select-none">
      <div class="flex h-full w-full items-center justify-center gap-12">
        <div class="truncate w-[340px] text-center font-medium text-white text-[32px]">
          {{ songPlaying.title }}
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .songPlaying {
        background-image: url('../../../assets/song_indicator.png');
      }
    `,
  ],
})
export class TVComponent implements OnInit {
  navState: TvNavbarState = 'home';
  songPlaying: SongModel = {} as SongModel;
  isPlaying: boolean = false;

  constructor(
    private navbarState: NavbarStateService,
    private socketsService: SocketsService,
    private songPlayingService: SongPlayingService,
  ) {}

  ngOnInit(): void {
    this.navbarState.navState$.subscribe((event) => (this.navState = event));

    this.songPlayingService.songPlaying$.subscribe((song) => (this.songPlaying = song));
    this.socketsService.subscribe('play', (isPlaying: boolean) => (this.isPlaying = isPlaying));
  }
}
