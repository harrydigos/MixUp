import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tv-card',
  templateUrl: './tv-card.component.html',
  styleUrls: ['./tv-card.component.scss'],
})
export class TvCardComponent implements OnInit {
  @Input() id: number = 0;
  @Input() album: string = '';
  @Input() artist: string = '';
  @Input() imgUrl: string = '';

  constructor() {}

  ngOnInit(): void {}
}
