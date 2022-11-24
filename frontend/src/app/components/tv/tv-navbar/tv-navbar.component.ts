import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TvNavbarState } from 'src/app/models/tvNavbarState';
import { TvService } from 'src/app/services/tv.service';

@Component({
  selector: 'app-tv-navbar',
  templateUrl: './tv-navbar.component.html',
  styleUrls: ['./tv-navbar.component.scss'],
})
export class TvNavbarComponent implements OnInit {
  @Input() page: TvNavbarState = 'home';

  constructor(private tvService: TvService) {}

  ngOnInit(): void {}

  reRenderNavState(state: TvNavbarState): void {
    this.tvService.setNavState(state);
  }
}
