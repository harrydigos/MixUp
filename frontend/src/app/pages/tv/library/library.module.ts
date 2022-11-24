import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibraryRoutingModule } from './library-routing.module';
import { FavoritesComponent } from './favorites/favorites.component';
import { PlaylistsComponent } from './playlists/playlists.component';
import { TvLibCardComponent } from 'src/app/components/tv/tv-lib-card/tv-lib-card.component';

@NgModule({
  declarations: [FavoritesComponent, PlaylistsComponent, TvLibCardComponent],
  imports: [CommonModule, LibraryRoutingModule],
})
export class LibraryModule {}
