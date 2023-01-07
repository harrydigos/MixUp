import { Component, OnInit } from '@angular/core';
import { LibraryNavState } from 'src/app/global/models';
import { NavbarStateService } from 'src/app/global/services';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent implements OnInit {
  libraryNavState: LibraryNavState = 'favorites';

  constructor(private navbarState: NavbarStateService) {
    this.navbarState.setNavState('library');
  }

  ngOnInit(): void {
    this.navbarState.libraryNavState$.subscribe((event) => (this.libraryNavState = event));
  }
}
