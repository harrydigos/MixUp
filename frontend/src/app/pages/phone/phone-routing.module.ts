import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhoneComponent } from './phone.component';

import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { PlaylistsComponent } from './library/playlists/playlists.component';
import { FavoritesComponent } from './library/favorites/favorites.component';
import { LibraryComponent } from './library/library.component';
import { PlayingSongComponent } from './playing-song/playing-song.component';

const routes: Routes = [
  {
    path: '',
    component: PhoneComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      /* --- */
      { path: 'search', component: SearchComponent },
      { path: 'library', component: LibraryComponent },

      { path: 'favorites', component: FavoritesComponent },
      { path: 'playlists', component: PlaylistsComponent },
      { path: 'play/:id', component: PlayingSongComponent },

      { path: '**', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhoneRoutingModule {}
