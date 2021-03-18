import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FlightListComponent} from './flight-list/flight-list.component';
import {IndexComponent} from './index/index.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'flights', component: FlightListComponent
  },
  {
    path: '', component: IndexComponent
  },
  {
    path: '**', component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
