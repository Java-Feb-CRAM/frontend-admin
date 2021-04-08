import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexPageComponent } from './pages/index-page/index-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { AirportsPageComponent } from './pages/airports-page/airports-page.component';
import { AirplaneTypesPageComponent } from './pages/airplane-types-page/airplane-types-page.component';
import { AirplanesPageComponent } from './pages/airplanes-page/airplanes-page.component';
import { RoutesPageComponent } from './pages/routes-page/routes-page.component';
import { FlightsPageComponent } from './pages/flights-page/flights-page.component';

const routes: Routes = [
  {
    path: '',
    component: IndexPageComponent,
  },
  {
    path: 'airplanes',
    component: AirplanesPageComponent,
  },
  {
    path: 'airplane-types',
    component: AirplaneTypesPageComponent,
  },
  {
    path: 'airports',
    component: AirportsPageComponent,
  },
  {
    path: 'flights',
    component: FlightsPageComponent,
  },
  {
    path: 'routes',
    component: RoutesPageComponent,
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
