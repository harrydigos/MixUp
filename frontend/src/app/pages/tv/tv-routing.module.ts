import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { TVComponent } from './tv.component';
import { HomeComponent } from 'src/app/pages/tv/home/home.component';
import { LibraryComponent } from './library/library.component';

const routes: Routes = [
  {
    path: '',
    component: TVComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'search', component: SearchComponent },
      { path: 'library', component: LibraryComponent },
      { path: '**', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TvRoutingModule {}
