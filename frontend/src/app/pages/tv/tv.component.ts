import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
        <audio #player *ngIf="canPlaySong()" src="assets/songs/{{ song }}.mp3"></audio>
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
  @ViewChild('player') player!: ElementRef<HTMLAudioElement>;

  navState: TvNavbarState = 'home';
  songPlaying: SongModel = {} as SongModel;
  isPlaying: boolean = false;

  song: string = '';
  canPlaySong = () => {
    if (this.songPlaying.title === 'Waiting For Love') {
      this.song = 'waiting_for_love';
      return true;
    }
    return false;
  };

  constructor(
    private navbarState: NavbarStateService,
    private socketsService: SocketsService,
    private songPlayingService: SongPlayingService,
  ) {}

  ngOnInit(): void {
    this.navbarState.navState$.subscribe((event) => (this.navState = event));

    this.songPlayingService.songPlaying$.subscribe((song) => (this.songPlaying = song));
    this.socketsService.subscribe('play', (isPlaying: boolean) => {
      this.isPlaying = isPlaying;
      if (this.canPlaySong()) {
        if (isPlaying) this.player.nativeElement.play();
        else this.player.nativeElement.pause();
      }
    });

    this.socketsService.subscribe('mute', (isMuted: boolean) =>
      this.canPlaySong() ? (this.player.nativeElement.muted = isMuted) : null,
    );
  }
}
