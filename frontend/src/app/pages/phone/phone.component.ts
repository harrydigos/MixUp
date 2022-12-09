import { Component, OnInit } from '@angular/core';
import { TvNavbarState } from 'src/app/global/models';
import { PhoneNavbarState } from 'src/app/global/models/navbar/phoneNavbarState.model';
import { NavbarStateService } from 'src/app/global/services';


@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss']
})
export class PhoneComponent implements OnInit {
  navState: PhoneNavbarState = 'home';

  constructor() { }

  ngOnInit(): void {
  }

}
