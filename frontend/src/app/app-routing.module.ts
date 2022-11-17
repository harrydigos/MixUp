import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemShopComponent } from './pages/item-shop/item-shop.component';
import { TableComponent } from './pages/table/table.component';
import { TVComponent } from './pages/tv/tv.component';
import { WallComponent } from './pages/wall/wall.component';
import { PhoneComponent } from './pages/phone/phone.component';

const routes: Routes = [
  { path: 'tv', component: TVComponent },
  { path: 'table', component: TableComponent },
  { path: 'wall', component: WallComponent },
  { path: 'phone', component: PhoneComponent },

  // { path: 'socket-events', loadChildren: () => import('./pages/socket-events/socket-events.module').then(m => m.SocketEventsModule) },
  {
    path: 'tasks',
    loadChildren: () =>
      import('./pages/tasks/tasks.module').then((m) => m.TasksModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  { path: 'item-shop', component: ItemShopComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
