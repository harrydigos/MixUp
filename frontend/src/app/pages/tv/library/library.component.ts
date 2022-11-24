import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TvService } from 'src/app/services/tv.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent implements OnInit {
  libraryNavState: 'favorites' | 'playlists' = 'favorites';

  constructor(private tvService: TvService, private router: Router) {
    this.tvService.setNavState('library');
  }

  ngOnInit(): void {
    this.tvService.libraryNavState$.subscribe(
      (event) => (this.libraryNavState = event)
    );
  }
}
