import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './components/index/index.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { FlightPlaneModule } from './services/flight-plane.module';
import {
  OWL_DATE_TIME_LOCALE,
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from 'ng-pick-datetime';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { EntitySelectionFormComponent } from './modules/forms/entity-selection-form/entity-selection-form.component';
import { DateTimeFormComponent } from './modules/forms/date-time-form/date-time-form.component';
import { PositiveIntegerFormComponent } from './modules/forms/positive-integer-form/positive-integer-form.component';
import { PriceFormComponent } from './modules/forms/price-form/price-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlightFormComponent } from './modules/forms/flight-form/flight-form.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    PageNotFoundComponent,
    HeaderComponent,
    FooterComponent,
    ConfirmModalComponent,
    DataTableComponent,
    EntitySelectionFormComponent,
    DateTimeFormComponent,
    PositiveIntegerFormComponent,
    PriceFormComponent,
    FlightFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: OWL_DATE_TIME_LOCALE,
      useValue: 'en-US',
    },
  ],
  bootstrap: [AppComponent],
  exports: [DataTableComponent],
})
export class AppModule {}
