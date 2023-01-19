import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LibraryNavState, NavbarState } from 'src/app/global/models';

@Injectable({
  providedIn: 'root',
})
export class TvNavbarStateService {
  navState = new BehaviorSubject<NavbarState>('home');
  readonly navState$ = this.navState.asObservable();

  libraryNavState = new BehaviorSubject<LibraryNavState>('favorites');
  readonly libraryNavState$ = this.libraryNavState.asObservable();

  constructor() {}

  setNavState = (state: NavbarState) => this.navState.next(state);

  getNavState = (): NavbarState => this.navState.getValue();

  setLibraryNavState = (state: LibraryNavState) => this.libraryNavState.next(state);

  getLibraryNavState = (): LibraryNavState => this.libraryNavState.getValue();
}
