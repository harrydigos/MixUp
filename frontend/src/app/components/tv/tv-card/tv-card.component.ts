import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tv-card',
  template: `
    <div class="group relative w-[400px] flex flex-col gap-4 py-3 rounded-2xl">
      <div
        class="absolute -z-10 w-full h-[300px] rounded-2xl group-hover:bg-blue-light duration-100 delay-75 ease-out"
      ></div>
      <img
        draggable="false"
        src="{{ imgUrl }}"
        class="w-full h-[300px] rounded-2xl object-cover group-hover:translate-x-2 group-hover:-translate-y-2 duration-100 delay-75 ease-out"
      />
      <div class="flex flex-col items-center">
        <div class="max-w-[380px] truncate font-medium text-white text-[32px]">
          {{ album }}
        </div>
        <div class="max-w-[380px] truncate font-medium text-blue-extra-light text-2xl">
          {{ artist }}
        </div>
      </div>
    </div>
  `,
})
export class TvCardComponent implements OnInit {
  @Input() id: number = 0;
  @Input() album: string = '';
  @Input() artist: string = '';
  @Input() imgUrl: string = '';

  constructor() {}

  ngOnInit(): void {}
}
