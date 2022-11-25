import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TvRoutingModule } from './tv-routing.module';
import { TvCardComponent } from 'src/app/components/tv/tv-card/tv-card.component';
import { HomeComponent } from 'src/app/pages/tv/home/home.component';
import { SearchComponent } from './search/search.component';
import { TvGenreCardComponent } from 'src/app/components/tv/tv-genre-card/tv-genre-card.component';
import { LibraryComponent } from './library/library.component';
import { AlbumComponent } from './album/album.component';

@NgModule({
  declarations: [
    HomeComponent,
    SearchComponent,
    LibraryComponent,

    TvCardComponent,
    TvGenreCardComponent,
    AlbumComponent,
  ],
  imports: [CommonModule, TvRoutingModule],
})
export class TvModule {}
