import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tv-card',
  templateUrl: './tv-card.component.html',
  styleUrls: ['./tv-card.component.scss'],
})
export class TvCardComponent implements OnInit {
  @Input() album: string = '';
  @Input() artist: string = '';
  @Input() img?: string;

  constructor() {}

  ngOnInit(): void {}
}
