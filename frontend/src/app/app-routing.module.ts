import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemShopComponent } from './pages/item-shop/item-shop.component';
import { TableComponent } from './pages/table/table.component';
import { WallComponent } from './pages/wall/wall.component';
import { PhoneComponent } from './pages/phone/phone.component';

const routes: Routes = [
  {
    path: 'tv',
    loadChildren: () => import('./pages/tv/tv.module').then((m) => m.TvModule),
  },

  { path: 'table', component: TableComponent },
  { path: 'wall', component: WallComponent },
  {
    path: 'phone',
    loadChildren: () => import('./pages/phone/phone.module').then((m) => m.PhoneModule),
  },

  {
    path: 'tasks',
    loadChildren: () => import('./pages/tasks/tasks.module').then((m) => m.TasksModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  { path: 'item-shop', component: ItemShopComponent },
  { path: '**', redirectTo: 'tv', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
