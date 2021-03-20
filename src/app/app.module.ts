import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { FlightListComponent } from './flight-list/flight-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { AirportListComponent } from './airport-list/airport-list.component';
import { AirplaneListComponent } from './airplane-list/airplane-list.component';
import { AirplaneTypeListComponent } from './airplane-type-list/airplane-type-list.component';
import { RouteListComponent } from './route-list/route-list.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    FlightListComponent,
    PageNotFoundComponent,
    HeaderComponent,
    FooterComponent,
    AirportListComponent,
    AirplaneListComponent,
    AirplaneTypeListComponent,
    RouteListComponent,
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, NgbModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
