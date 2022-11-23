import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TvService {
  navState: 'home' | 'search' | 'library' | 'hide' = 'home';

  constructor() {}

  setNavState(state: 'home' | 'search' | 'library' | 'hide') {
    this.navState = state;
  }

  getNavState(): 'home' | 'search' | 'library' | 'hide' {
    return this.navState;
  }
}
