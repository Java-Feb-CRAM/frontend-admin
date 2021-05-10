import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IndexPageComponent } from './pages/index-page/index-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AirportsPageComponent } from './pages/airports-page/airports-page.component';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FlightTableComponent } from './components/flight/flight-table/flight-table.component';
import { AirportTableComponent } from './components/airport/airport-table/airport-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ConfirmDeleteComponent } from './components/confirm-delete/confirm-delete.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AirportFormComponent } from './components/airport/airport-form/airport-form.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FlightFormComponent } from './components/flight/flight-form/flight-form.component';
import { LoginFormComponent } from './components/authentication/login-form/login-form.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthInterceptor } from './auth.interceptor';
import { AirportDetailsComponent } from './components/airport/airport-details/airport-details.component';
import { AirplaneTypeDetailsComponent } from './components/airplane-type/airplane-type-details/airplane-type-details.component';
import { AirplaneTypeFormComponent } from './components/airplane-type/airplane-type-form/airplane-type-form.component';
import { AirplaneTypeTableComponent } from './components/airplane-type/airplane-type-table/airplane-type-table.component';
import { AirplaneTypesPageComponent } from './pages/airplane-types-page/airplane-types-page.component';
import { AirplanesPageComponent } from './pages/airplanes-page/airplanes-page.component';
import { AirplaneDetailsComponent } from './components/airplane/airplane-details/airplane-details.component';
import { AirplaneFormComponent } from './components/airplane/airplane-form/airplane-form.component';
import { AirplaneTableComponent } from './components/airplane/airplane-table/airplane-table.component';
import { RoutesPageComponent } from './pages/routes-page/routes-page.component';
import { RouteDetailsComponent } from './components/route/route-details/route-details.component';
import { RouteFormComponent } from './components/route/route-form/route-form.component';
import { RouteTableComponent } from './components/route/route-table/route-table.component';
import { FlightDetailsComponent } from './components/flight/flight-details/flight-details.component';
import { FlightsPageComponent } from './pages/flights-page/flights-page.component';
import { LoadingButtonComponent } from './components/loading-button/loading-button.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SeatLayoutsPageComponent } from './pages/seat-layouts-page/seat-layouts-page.component';
import { ClassSeatsComponent } from './components/seating/class-seats/class-seats.component';
import { FlightSeatsComponent } from './components/seating/flight-seats/flight-seats.component';
import { SeatComponent } from './components/seating/seat/seat.component';
import { CreateSeatLayoutPageComponent } from './pages/create-seat-layout-page/create-seat-layout-page.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexPageComponent,
    NotFoundPageComponent,
    HeaderComponent,
    FooterComponent,
    AirportsPageComponent,
    FlightTableComponent,
    AirportTableComponent,
    ConfirmDeleteComponent,
    AirportFormComponent,
    FlightFormComponent,
    LoginFormComponent,
    LoginPageComponent,
    AirportDetailsComponent,
    AirplaneTypeDetailsComponent,
    AirplaneTypeFormComponent,
    AirplaneTypeTableComponent,
    AirplaneTypesPageComponent,
    AirplanesPageComponent,
    AirplaneDetailsComponent,
    AirplaneFormComponent,
    AirplaneTableComponent,
    RoutesPageComponent,
    RouteDetailsComponent,
    RouteFormComponent,
    RouteTableComponent,
    FlightDetailsComponent,
    FlightsPageComponent,
    LoadingButtonComponent,
    SeatLayoutsPageComponent,
    ClassSeatsComponent,
    FlightSeatsComponent,
    SeatComponent,
    CreateSeatLayoutPageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxMaterialTimepickerModule,
    FontAwesomeModule,
    FlexLayoutModule,
    MatTableModule,
    MatToolbarModule,
    MatMenuModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    NgxMaterialTimepickerModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatSnackBarModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
