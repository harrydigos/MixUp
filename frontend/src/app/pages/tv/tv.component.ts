import { Component, OnInit } from '@angular/core';
import { SongModel, TvNavbarState } from 'src/app/global/models';
import { NavbarStateService, QueueService, SocketsService } from 'src/app/global/services';

@Component({
  selector: 'app-tv',
  template: `
    <app-tv-navbar [page]="navState"></app-tv-navbar>
    <router-outlet></router-outlet>
    <div *ngIf="queue.length" class="fixed bottom-0 w-screen h-[76px] songPlaying select-none">
      <div class="flex h-full w-full items-center justify-center gap-12">
        <div class="font-medium text-white text-[32px]">{{ queue[0].title }}</div>
        <img class="cursor-pointer hover:opacity-75" src="assets/Icons/Previous.svg" width="32" />
        <button (click)="togglePlay()" class="hover:opacity-70">
          <img *ngIf="isPlaying; else pause" src="assets/Icons/Pause.svg" width="48" />
          <ng-template #pause>
            <img src="assets/Icons/Table/Play.svg" width="48px" />
          </ng-template>
        </button>
        <img class="cursor-pointer hover:opacity-75" src="assets/Icons/Next.svg" width="32" />
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
  queue: SongModel[] = [];

  isPlaying: boolean = false;

  togglePlay(): void {
    this.isPlaying = !this.isPlaying;
    this.socketsService.publish('play', this.isPlaying);
  }

  constructor(
    private navbarState: NavbarStateService,
    private socketsService: SocketsService,
    private queueService: QueueService,
  ) {}

  ngOnInit(): void {
    this.navbarState.navState$.subscribe((event) => (this.navState = event));

    this.queueService.queue$.subscribe((queue) => (this.queue = queue));
    this.socketsService.subscribe('play', (isPlaying: boolean) => (this.isPlaying = isPlaying));
  }
}
