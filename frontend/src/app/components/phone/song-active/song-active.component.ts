import { Component, Input, OnInit } from '@angular/core';
import { SongModel } from 'src/app/global/models';
import { SongPlayingService } from 'src/app/global/services';

@Component({
  selector: 'app-song-active',
  template: `
    <div *ngIf="active">
      <button
        *ngIf="songPlaying._id"
        class="fixed bottom-[60px] z-50 flex w-full items-center rounded-t-2xl bg-blue py-2 px-4"
      >
        <img src="assets/images/songs/{{ songPlaying.image }}" class="h-12 w-12 rounded-[10px] object-cover" />

        <div
          class="grid h-10 w-full grid-rows-2 justify-items-start gap-1 pl-3"
          routerLink="/phone/play/{{ songPlaying._id }}"
        >
          <div class="text-[16px] font-normal text-white">{{ songPlaying.title }}</div>
          <div class="text-[12px] font-light text-white">{{ songPlaying.artist }}</div>
        </div>

        <div class="absolute bottom-0 left-0 h-1 w-full bg-[#294249]"></div>
        <div class="absolute bottom-0 left-0 h-1 bg-blue-light" [ngStyle]="setWidth()"></div>
      </button>
    </div>
  `,
})
export class SongActiveComponent implements OnInit {
  @Input() active: boolean = false;

  songPlaying: SongModel = {} as SongModel;
  songCurrentTime: number = 0;

  constructor(private songPlayingService: SongPlayingService) {}

  ngOnInit(): void {
    this.songPlayingService.currentTime$.subscribe((time) => (this.songCurrentTime = time));
    this.songPlayingService.songPlaying$.subscribe((song) => (this.songPlaying = song));
  }

  setWidth = (): Record<'width', string> => {
    return {
      width: `${(this.songCurrentTime / (this.songPlaying.duration * 60)) * 100}%`,
    };
  };
}
