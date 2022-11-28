import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-phone-card',
  templateUrl: './phone-card.component.html',
  styleUrls: ['./phone-card.component.scss']
})
export class PhoneCardComponent implements OnInit {

  @Input() album: string = '';
  @Input() artist: string = '';
  @Input() img?: string;

  constructor() { }

  ngOnInit(): void {
  }

}
