import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { ItemShopComponent } from './pages/item-shop/item-shop.component';
import { ItemPreviewComponent } from './pages/item-shop/item-preview/item-preview.component';
import { TableComponent } from './pages/table/table.component';
import { WallComponent } from './pages/wall/wall.component';
import { PhoneComponent } from './pages/phone/phone.component';
import { TVComponent } from './pages/tv/tv.component';
import { TvNavbarComponent } from './components/tv/tv-navbar/tv-navbar.component';
import { HomeComponent } from './pages/phone/home/home.component';
import { PhoneCardComponent } from './components/phone/phone-card/phone-card.component';
import { NewTracksComponent } from './components/phone/new-tracks/new-tracks.component';
import { TableDiscComponent } from './components/table/table-disc/table-disc.component';

const socketIoConfig: SocketIoConfig = { url: environment.host, options: {} };
@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    ItemShopComponent,
    ItemPreviewComponent,

    TvNavbarComponent,
    TVComponent,
    TableComponent,
    WallComponent,
    PhoneComponent,
    HomeComponent,
    PhoneCardComponent,
    NewTracksComponent,
    TableDiscComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
  imports: [
    SocketIoModule.forRoot(socketIoConfig),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
})
export class AppModule {}
