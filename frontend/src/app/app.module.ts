import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CardWrapperModule } from './components/global/card-wrapper/card-wrapper.module';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';

import { TasksComponent } from './pages/tasks/tasks.component';
import { ItemShopComponent } from './pages/item-shop/item-shop.component';
import { ItemPreviewComponent } from './pages/item-shop/item-preview/item-preview.component';

import { TableComponent } from './pages/table/table.component';
import { WallComponent } from './pages/wall/wall.component';
import { PhoneComponent } from './pages/phone/phone.component';
import { TVComponent } from './pages/tv/tv.component';

import { TvNavbarComponent } from './components/tv/tv-navbar/tv-navbar.component';
import { TableDiscComponent } from './components/table/table-disc/table-disc.component';

const socketIoConfig: SocketIoConfig = { url: environment.host, options: {} };
@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    ItemShopComponent,
    ItemPreviewComponent,

    TVComponent,
    TableComponent,
    WallComponent,
    PhoneComponent,

    TvNavbarComponent,
    TableDiscComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
  imports: [
    SocketIoModule.forRoot(socketIoConfig),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CardWrapperModule,
  ],
})
export class AppModule {}
