import { Component, OnInit, Input } from '@angular/core';
import { NavbarState } from 'src/app/global/models';

@Component({
  selector: 'app-ph-navbar',
  templateUrl: './ph-navbar.component.html',
  styleUrls: ['./ph-navbar.component.scss'],
})
export class PhNavbarComponent implements OnInit {
  @Input() page: NavbarState = 'home';

  constructor() {}

  ngOnInit(): void {}
}
