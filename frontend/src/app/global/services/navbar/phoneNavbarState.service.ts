import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PhoneNavbarState } from '../../models/navbar/phoneNavbarState.model';

@Injectable({
  providedIn: 'root',
})
export class NavbarStateService {
  navState = new BehaviorSubject<PhoneNavbarState>('home');
  readonly navState$ = this.navState.asObservable();

  libraryNavState = new BehaviorSubject<'favorites' | 'playlists'>('favorites');
  readonly libraryNavState$ = this.libraryNavState.asObservable();

  constructor() {}

  setNavState(state: PhoneNavbarState): void {
    this.navState.next(state);
  }

  getNavState(): PhoneNavbarState {
    return this.navState.getValue();
  }

  setLibraryNavState(state: 'favorites' | 'playlists'): void {
    this.libraryNavState.next(state);
  }

  getLibraryNavState(): 'favorites' | 'playlists' {
    return this.libraryNavState.getValue();
  }
}
