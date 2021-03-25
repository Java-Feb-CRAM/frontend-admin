import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AirplaneListComponent } from '../components/flight-plane/airplane-list/airplane-list.component';
import { AirplaneTypeListComponent } from '../components/flight-plane/airplane-type-list/airplane-type-list.component';
import { AirportListComponent } from '../components/flight-plane/airport-list/airport-list.component';
import { FlightListComponent } from '../components/flight-plane/flight-list/flight-list.component';
import { RouteListComponent } from '../components/flight-plane/route-list/route-list.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  NgbDatepickerModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { OwlDateTimeModule } from 'ng-pick-datetime';
import { FlightDetailsComponent } from '../components/flight-plane/flight-details/flight-details.component';
import { FlightCrudComponent } from '../components/flight-plane/flight-crud/flight-crud.component';
import { FlightFormComponent } from '../components/flight-plane/flight-form/flight-form.component';
import { AppModule } from '../app.module';
import { ManageFlightsComponent } from '../components/flight-plane/manage-flights/manage-flights.component';
import { ManageAirplanesComponent } from '../components/flight-plane/manage-airplanes/manage-airplanes.component';
import { ManageAirplaneTypesComponent } from '../components/flight-plane/manage-airplane-types/manage-airplane-types.component';
import { ManageAirportsComponent } from '../components/flight-plane/manage-airports/manage-airports.component';
import { ManageRoutesComponent } from '../components/flight-plane/manage-routes/manage-routes.component';

@NgModule({
  declarations: [
    AirplaneListComponent,
    AirplaneTypeListComponent,
    AirportListComponent,
    FlightListComponent,
    RouteListComponent,
    FlightDetailsComponent,
    FlightCrudComponent,
    FlightFormComponent,
    ManageFlightsComponent,
    ManageAirplanesComponent,
    ManageAirplaneTypesComponent,
    ManageAirportsComponent,
    ManageRoutesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgbDatepickerModule,
    OwlDateTimeModule,
    NgbTooltipModule,
    AppModule,
  ],
})
export class FlightPlaneModule {}
