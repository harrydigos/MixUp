import { Component, OnInit, Input } from '@angular/core';
import { PhoneNavbarState } from 'src/app/global/models/navbar/phoneNavbarState.model';

@Component({
  selector: 'app-ph-navbar',
  templateUrl: './ph-navbar.component.html',
  styleUrls: ['./ph-navbar.component.scss']
})
export class PhNavbarComponent implements OnInit {

  @Input() page: PhoneNavbarState = 'home';

  constructor() { }

  ngOnInit(): void {
  }

}
