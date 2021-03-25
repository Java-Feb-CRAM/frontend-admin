import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AirplaneListComponent } from './components/flight-plane/airplane-list/airplane-list.component';
import { AirplaneTypeListComponent } from './components/flight-plane/airplane-type-list/airplane-type-list.component';
import { AirportListComponent } from './components/flight-plane/airport-list/airport-list.component';
import { FlightListComponent } from './components/flight-plane/flight-list/flight-list.component';
import { RouteListComponent } from './components/flight-plane/route-list/route-list.component';
import { FlightDetailsComponent } from './components/flight-plane/flight-details/flight-details.component';
import { FlightCrudComponent } from './components/flight-plane/flight-crud/flight-crud.component';
import { ManageAirplanesComponent } from './components/flight-plane/manage-airplanes/manage-airplanes.component';
import { ManageAirplaneTypesComponent } from './components/flight-plane/manage-airplane-types/manage-airplane-types.component';
import { ManageAirportsComponent } from './components/flight-plane/manage-airports/manage-airports.component';
import { ManageFlightsComponent } from './components/flight-plane/manage-flights/manage-flights.component';
import { ManageRoutesComponent } from './components/flight-plane/manage-routes/manage-routes.component';
import { FlightFormComponent } from './modules/forms/flight-form/flight-form.component';

const routes: Routes = [
  {
    path: 'airplanes',
    component: ManageAirplanesComponent,
  },
  {
    path: 'airplane-types',
    component: ManageAirplaneTypesComponent,
  },
  {
    path: 'airports',
    component: ManageAirportsComponent,
  },
  {
    path: 'flights',
    component: FlightFormComponent,
  },
  {
    path: 'routes',
    component: ManageRoutesComponent,
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
