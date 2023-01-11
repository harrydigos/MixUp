import { SongModel, NavbarState } from 'src/app/global/models';
import { LeapService, NavbarStateService, SocketsService, SongPlayingService } from 'src/app/global/services';
import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-tv',
  template: `
    <app-tv-navbar [page]="navState"></app-tv-navbar>
    <router-outlet></router-outlet>
    <div *ngIf="songPlaying._id">
      <div class="songPlaying fixed bottom-1 h-[76px] w-screen select-none">
        <div class="flex h-full w-full items-center justify-center gap-12">
          <div class="w-[340px] truncate text-center text-[32px] font-medium text-white">
            {{ songPlaying.title }}
          </div>
          <audio #player *ngIf="canPlaySong()" (timeupdate)="onTimeUpdate()" src="assets/songs/{{ song }}.mp3"></audio>
        </div>
      </div>
      <div class="fixed bottom-0 h-1 w-full bg-[#294249]"></div>
      <div class="fixed bottom-0 h-1 bg-blue-light" [ngStyle]="setWidth()"></div>
    </div>

    <!-- Queue message -->
    <div
      class="duration-400 absolute bottom-28 flex w-screen items-center justify-center transition"
      [ngStyle]="{ opacity: queueMessage.show ? 1 : 0 }"
    >
      <div
        class="flex items-center justify-center rounded-lg bg-blue-extra-light px-8 py-4 text-2xl font-medium text-blue"
      >
        {{ queueMessage.message }}
      </div>
    </div>

    <!-- Remove message -->
    <div
      class="duration-400 absolute bottom-28 flex w-screen items-center justify-center transition"
      [ngStyle]="{ opacity: removeMessage.show ? 1 : 0 }"
    >
      <div
        class="flex items-center justify-center rounded-lg bg-blue-extra-light px-8 py-4 text-2xl font-medium text-blue"
      >
        {{ removeMessage.message }}
      </div>
    </div>

    <!-- Virtual Cursor -->
    <div id="cursor" #vcur [ngStyle]="cursorStyle" class="cursor-outer">
      <div [ngStyle]="cursorSize" class="vcursor"></div>
      <div [ngStyle]="loading" class="loading">
        <div [ngStyle]="cursorSize" class="black"></div>
      </div>
    </div>
  `,
  styles: [
    `
      .songPlaying {
        background-image: url('../../../assets/song_indicator.png');
      }

      .vcursor {
        opacity: 0.5;
        border-radius: 100%;
        z-index: 10000;
        position: absolute;
      }

      .cursor-outer {
        background-color: transparent;
        border-radius: 100%;
        position: absolute;
        z-index: 10000;
      }

      .loading {
        position: absolute;
        overflow: hidden;
      }

      .black {
        border-radius: 100%;
        position: relative;
      }
    `,
  ],
})
export class TVComponent implements OnInit {
  @ViewChild('player') player!: ElementRef<HTMLAudioElement>;

  navState: NavbarState = 'home';
  songPlaying: SongModel = {} as SongModel;
  song: string = '';

  queueMessage = { message: '', show: false };

  removeMessage = { message: '', show: false };

  isPlaying: boolean = false;
  currTime: number = 0;

  /* Virtual Cursor Variables */

  @Input() elements2Check = ['btn1', 'btn2', 'btn3', 'btn4']; // elements you set to listen to click event. You can modify it to listen to html elemets as well (check ngOnInit)
  @Input() size = 40; // cursor diameter in px
  @Input() color = 'black';

  private canClick: boolean;
  public clickEvents: string[] = [];
  private intervalBetweenClicks: number;
  private clickX;
  private clickY;

  public cursorStyle;
  public cursorSize;

  public loading = {
    width: '0%',
  };

  private cursorCounter = 0;

  constructor(
    private navbarState: NavbarStateService,
    private socketsService: SocketsService,
    private songPlayingService: SongPlayingService,
    public leap: LeapService,
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

    this.socketsService.subscribe(
      'queueMessage',
      (data: { message: string; show: boolean }) => (this.queueMessage = data),
    );

    this.socketsService.subscribe(
      'deleteMessage',
      (data: { message: string; show: boolean }) => (this.removeMessage = data),
    );

    /* Virtual Cursor */

    this.initCursorLook();
    this.canClick = true; // can click at start
    this.intervalBetweenClicks = 2000; //ms ==> recognize pinch every 2 seconds
    // add click events to elements you previously chose to "track"
    this.elements2Check.forEach((element) => {
      $('#' + element).click(() => {
        this.addClickEvent('clicked button: #' + element);
      });
    });

    setInterval(() => {
      this.cursorCounter++;
      if (this.cursorCounter == 5) {
        this.cursorStyle.display = 'none';
      }
    }, 200);

    this.leap.cursorRecognizer().subscribe((leapPos) => {
      this.cursorStyle.left = leapPos.xPos + 'px';
      this.cursorStyle.top = leapPos.yPos + 'px';
      this.clickX = leapPos.xPos;
      this.clickY = leapPos.yPos;
      this.cursorStyle.display = 'block';

      this.cursorCounter = 0;

      if (this.canClick) this.checkPinch();
    });
  }

  canPlaySong = () => {
    if (this.songPlaying.title === 'Waiting For Love') {
      this.song = 'waiting_for_love';
      return true;
    } else if (this.songPlaying.title === 'Blinding Lights') {
      this.song = 'blinding_lights';
      return true;
    }

    return false;
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

  /* Virtual Cursor */

  addClickEvent = (event: string) => this.clickEvents.push(event);

  private checkPinch() {
    if (this.canClick && this.leap.gestureRecognized === 'PINCH') {
      console.log('Pinch, Position X:', this.clickX, 'Position Y:', this.clickY);
      this.pauseClicks();
      this.leap.gestureRecognized = '';
      let event = new MouseEvent('click');
      const el = document.elementFromPoint(this.clickX, this.clickY);
      el.dispatchEvent(event);
    }
  }

  private pauseClicks() {
    this.canClick = false;
    setTimeout(() => {
      this.canClick = true;
    }, this.intervalBetweenClicks);
  }

  private initCursorLook() {
    this.cursorSize = {
      width: this.size + 'px',
      height: this.size + 'px',
      'background-color': this.color,
    };

    this.cursorStyle = {
      top: '0px',
      left: '0px',
      display: 'none',
      width: this.size + 'px',
      height: this.size + 'px',
    };
  }
}
