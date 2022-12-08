import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tv-lib-card',
  templateUrl: './tv-lib-card.component.html',
  styleUrls: ['./tv-lib-card.component.scss'],
})
export class TvLibCardComponent implements OnInit {
  @Input() playlistName: string = '';
  @Input() tracks: number = 0;
  @Input() imgUrl: string = '';

  constructor() {}

  ngOnInit(): void {}
}
