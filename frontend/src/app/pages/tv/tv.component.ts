import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SongModel, TvNavbarState } from 'src/app/global/models';
import { NavbarStateService, SocketsService, SongPlayingService } from 'src/app/global/services';

@Component({
  selector: 'app-tv',
  template: `
    <app-tv-navbar [page]="navState"></app-tv-navbar>
    <router-outlet></router-outlet>
    <div *ngIf="songPlaying._id">
      <div class="songPlaying fixed bottom-1 w-screen h-[76px] select-none">
        <div class="flex h-full w-full items-center justify-center gap-12">
          <div class="truncate w-[340px] text-center font-medium text-white text-[32px]">
            {{ songPlaying.title }}
          </div>
          <audio #player *ngIf="canPlaySong()" (timeupdate)="onTimeUpdate()" src="assets/songs/{{ song }}.mp3"></audio>
        </div>
      </div>
      <div class="fixed bottom-0 w-full h-1 bg-[#294249]"></div>
      <div class="fixed bottom-0 h-1 bg-blue-light" [ngStyle]="setWidth()"></div>
    </div>

    <!-- Queue message -->
    <div
      class="absolute bottom-28 flex w-screen justify-center items-center transition duration-400"
      [ngStyle]="{ opacity: showQueueMessage ? 1 : 0 }"
    >
      <div
        class="flex justify-center items-center px-8 py-4 bg-blue-extra-light rounded-lg text-2xl font-medium text-blue"
      >
        {{ queueMessage }}
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
  song: string = '';

  queueMessage: string = '';
  showQueueMessage: boolean = false;

  isPlaying: boolean = false;
  currTime: number = 0;

  constructor(
    private navbarState: NavbarStateService,
    private socketsService: SocketsService,
    private songPlayingService: SongPlayingService,
  ) {}

  ngOnInit(): void {
    this.navbarState.navState$.subscribe((event) => (this.navState = event));

    this.songPlayingService.songPlaying$.subscribe((song) => (this.songPlaying = song));
    this.songPlayingService.currentTime$.subscribe((time) => {
      console.log(time);
      if (this.player) this.currTime = time;
    });
    this.songPlayingService.timeFromDevice$.subscribe((time) => {
      if (this.player) this.player.nativeElement.currentTime = time;
    });

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

    this.socketsService.subscribe('queueMessage', (data: { message: string; show: boolean }) => {
      this.queueMessage = data.message;
      this.showQueueMessage = data.show;
    });
  }

  canPlaySong = () => {
    if (this.songPlaying.title === 'Waiting For Love') {
      this.song = 'waiting_for_love';
      return true;
      //added this in order to listen blinding lights from tv and not phone
    } else if (this.songPlaying.title === 'Blinding Lights') {
      this.song = 'blinding_lights';
      return true;
    } else {
      return false;
    }
  };

  setWidth = (): Record<'width', string> => {
    if (!this.player) return { width: '0%' };
    return {
      width: `${(this.currTime / this.player.nativeElement.duration) * 100}%`,
    };
  };

  onTimeUpdate = () => {
    this.songPlayingService.setCurrentTime(this.player.nativeElement.currentTime);
  };
}
