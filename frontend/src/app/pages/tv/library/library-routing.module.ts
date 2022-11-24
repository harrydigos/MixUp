import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesComponent } from './favorites/favorites.component';
import { PlaylistsComponent } from './playlists/playlists.component';
import { LibraryComponent } from './library.component';

const routes: Routes = [
  {
    path: '',
    component: LibraryComponent,
    children: [
      { path: 'favorites', component: FavoritesComponent },
      { path: 'playlists', component: PlaylistsComponent },
      { path: '**', redirectTo: 'favorites', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibraryRoutingModule {}
