import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightListComponent } from './flight-list/flight-list.component';
import { IndexComponent } from './index/index.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AirportListComponent } from './airport-list/airport-list.component';
import { AirplaneListComponent } from './airplane-list/airplane-list.component';
import { AirplaneTypeListComponent } from './airplane-type-list/airplane-type-list.component';
import { RouteListComponent } from './route-list/route-list.component';

const routes: Routes = [
  {
    path: 'airplanes',
    component: AirplaneListComponent,
  },
  {
    path: 'airplane-types',
    component: AirplaneTypeListComponent,
  },
  {
    path: 'airports',
    component: AirportListComponent,
  },
  {
    path: 'flights',
    component: FlightListComponent,
  },
  {
    path: 'routes',
    component: RouteListComponent,
  },
  {
    path: '',
    component: IndexComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
