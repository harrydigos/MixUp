import { Component, OnInit } from '@angular/core';
import { TvService } from 'src/app/services/tv.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private tvService: TvService) {
    this.tvService.setNavState('home');
  }

  ngOnInit(): void {}
}
