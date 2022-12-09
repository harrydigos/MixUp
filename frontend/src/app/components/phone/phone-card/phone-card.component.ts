import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-phone-card',
  templateUrl: './phone-card.component.html',
  styleUrls: ['./phone-card.component.scss']
})
export class PhoneCardComponent implements OnInit {

  @Input() playlistName: string = '';
  @Input() tracks: number = 0;
  @Input() imgUrl: string = '';


  constructor() { }

  ngOnInit(): void {
  }

}
