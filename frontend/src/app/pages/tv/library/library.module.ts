import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibraryRoutingModule } from './library-routing.module';
import { FavoritesComponent } from './favorites/favorites.component';
import { PlaylistsComponent } from './playlists/playlists.component';
import { TvLibCardComponent } from 'src/app/components/tv/tv-lib-card/tv-lib-card.component';
import { TvSongTableComponent } from 'src/app/components/tv/tv-song-table/tv-song-table.component';
import { CardWrapperModule } from 'src/app/components/global/card-wrapper/card-wrapper.module';

@NgModule({
  declarations: [
    FavoritesComponent,
    PlaylistsComponent,
    TvLibCardComponent,
    TvSongTableComponent,
  ],
  imports: [CommonModule, LibraryRoutingModule, CardWrapperModule],
})
export class LibraryModule {}
