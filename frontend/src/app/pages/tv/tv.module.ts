import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TvRoutingModule } from './tv-routing.module';
import { TvCardComponent } from 'src/app/components/tv/tv-card/tv-card.component';
import { HomeComponent } from 'src/app/pages/tv/home/home.component';

@NgModule({
  declarations: [HomeComponent, TvCardComponent],
  imports: [CommonModule, TvRoutingModule],
})
export class TvModule {}
