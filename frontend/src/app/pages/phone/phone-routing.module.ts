import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhoneComponent } from './phone.component';

import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';

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
      { path: '**', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhoneRoutingModule {}
