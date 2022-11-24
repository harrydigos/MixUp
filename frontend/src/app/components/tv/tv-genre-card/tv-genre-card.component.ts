import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tv-genre-card',
  templateUrl: './tv-genre-card.component.html',
  styleUrls: ['./tv-genre-card.component.scss'],
})
export class TvGenreCardComponent implements OnInit {
  @Input() genre: string = '';

  constructor() {}

  ngOnInit(): void {}
}
