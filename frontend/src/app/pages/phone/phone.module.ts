import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneRoutingModule } from './phone-routing.module';

import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';

import { PhoneCardComponent } from 'src/app/components/phone/phone-card/phone-card.component';
import { NewTracksComponent } from 'src/app/components/phone/new-tracks/new-tracks.component';
import { PhNavbarComponent } from 'src/app/components/phone/ph-navbar/ph-navbar.component';
import { SongListComponent } from 'src/app/components/phone/song-list/song-list.component';
import { PlaylistsComponent } from './playlists/playlists.component';

@NgModule({
  declarations: [
    HomeComponent,
    SearchComponent,

    SongListComponent,
    PhoneCardComponent,
    NewTracksComponent,
    PhNavbarComponent,
    PlaylistsComponent,
  ],
  imports: [CommonModule, PhoneRoutingModule],
})
export class PhoneModule {}
