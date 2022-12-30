import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-disc',
  template: `
    <div class="w-[150px] flex flex-col gap-3 justify-center items-center">
      <img class="rounded-full" src="{{ imgUrl }}" draggable="false" />
      <h2 class="w-[140px] truncate text-center font-medium text-base text-white">
        {{ name }}
      </h2>
    </div>
  `,
})
export class TableDiscComponent implements OnInit {
  @Input() name: string = '';
  @Input() imgUrl: string = '';

  constructor() {}

  ngOnInit(): void {}
}
