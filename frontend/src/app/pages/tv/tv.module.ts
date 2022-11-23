import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TvRoutingModule } from './tv-routing.module';
import { TvCardComponent } from 'src/app/components/tv/tv-card/tv-card.component';
import { HomeComponent } from 'src/app/pages/tv/home/home.component';
import { SearchComponent } from './search/search.component';
import { LibraryComponent } from './library/library.component';
import { TvGenreCardComponent } from 'src/app/components/tv/tv-genre-card/tv-genre-card.component';
import { TvLibCardComponent } from 'src/app/components/tv/tv-lib-card/tv-lib-card.component';

@NgModule({
  declarations: [
    HomeComponent,
    SearchComponent,
    LibraryComponent,
    TvCardComponent,
    TvGenreCardComponent,
    TvLibCardComponent,
  ],
  imports: [CommonModule, TvRoutingModule],
})
export class TvModule {}
