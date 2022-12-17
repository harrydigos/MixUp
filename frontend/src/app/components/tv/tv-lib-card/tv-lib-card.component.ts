import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tv-lib-card',
  template: `
    <div class="group relative w-[300px] flex flex-col gap-4 pt-3 rounded-3xl">
      <div class="absolute w-full h-[300px] rounded-3xl group-hover:bg-blue-light duration-100"></div>
      <img
        draggable="false"
        src="{{ imgUrl }}"
        class="w-full h-[300px] rounded-3xl object-cover group-hover:translate-x-2 group-hover:-translate-y-2 duration-100"
      />
      <div>
        <div class="w-[280px] truncate font-base text-[32px] text-white">
          {{ playlistName }}
        </div>
        <div class="text-xl font-semibold text-blue-light">{{ tracks }} Tracks</div>
      </div>
    </div>
  `,
})
export class TvLibCardComponent implements OnInit {
  @Input() playlistName: string = '';
  @Input() tracks: number = 0;
  @Input() imgUrl: string = '';

  constructor() {}

  ngOnInit(): void {}
}
