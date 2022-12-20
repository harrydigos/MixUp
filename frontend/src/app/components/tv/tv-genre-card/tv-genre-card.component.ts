import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tv-genre-card',
  template: `
    <div class="relative h-48 w-64 rounded-2xl group">
      <div
        class="absolute -z-10 h-full w-full rounded-2xl delay-75 duration-100 ease-out group-hover:bg-blue-light"
      ></div>
      <img
        draggable="false"
        src="{{ imgUrl }}"
        class="h-full w-full rounded-2xl object-cover delay-75 duration-100 ease-out group-hover:translate-x-2 group-hover:-translate-y-2"
      />
      <div
        class="absolute left-6 bottom-6 leading-none font-semibold text-[32px] text-white group-hover:translate-x-2 group-hover:-translate-y-2 duration-100 delay-75 ease-out"
      >
        {{ genre }}
      </div>
    </div>
  `,
})
export class TvGenreCardComponent implements OnInit {
  @Input() genre: string = '';
  @Input() imgUrl: string = '';

  constructor() {}

  ngOnInit(): void {}
}
