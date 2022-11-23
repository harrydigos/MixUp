import { Component, OnInit } from '@angular/core';
import { TvService } from 'src/app/services/tv.service';
import type { TvNavbarState } from 'src/app/models/tvNavbarState';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.scss'],
})
export class TVComponent implements OnInit {
  navState: TvNavbarState = 'home';

  constructor(private tvService: TvService) {}

  ngOnInit(): void {}

  ngAfterContentChecked(): void {
    this.navState = this.tvService.getNavState();
  }
}
