import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './pages/table/table.component';
import { WallComponent } from './pages/wall/wall.component';

const routes: Routes = [
  {
    path: 'tv',
    loadChildren: () => import('./pages/tv/tv.module').then((m) => m.TvModule),
  },
  {
    path: 'phone',
    loadChildren: () => import('./pages/phone/phone.module').then((m) => m.PhoneModule),
  },
  { path: 'table', component: TableComponent },
  { path: 'wall', component: WallComponent },
  { path: '**', redirectTo: 'tv', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
