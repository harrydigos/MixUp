import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TvNavbarState } from '../models/tvNavbarState';

@Injectable({
  providedIn: 'root',
})
export class TvService {
  navState = new BehaviorSubject<TvNavbarState>('home');
  readonly navState$ = this.navState.asObservable();

  libraryNavState = new BehaviorSubject<'favorites' | 'playlists'>('favorites');
  readonly libraryNavState$ = this.libraryNavState.asObservable();

  constructor() {}

  setNavState(state: TvNavbarState): void {
    this.navState.next(state);
  }

  getNavState(): TvNavbarState {
    return this.navState.getValue();
  }

  setLibraryNavState(state: 'favorites' | 'playlists'): void {
    this.libraryNavState.next(state);
  }

  getLibraryNavState(): 'favorites' | 'playlists' {
    return this.libraryNavState.getValue();
  }
}
