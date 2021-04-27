import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexPageComponent } from './pages/index-page/index-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { AirportsPageComponent } from './pages/airports-page/airports-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthGuard } from './auth/auth.guard';
import { AirplaneTypesPageComponent } from './pages/airplane-types-page/airplane-types-page.component';
import { AirplanesPageComponent } from './pages/airplanes-page/airplanes-page.component';
import { RoutesPageComponent } from './pages/routes-page/routes-page.component';
import { FlightsPageComponent } from './pages/flights-page/flights-page.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: IndexPageComponent,
  },
  {
    path: 'airplanes',
    canActivate: [AuthGuard],
    component: AirplanesPageComponent,
  },
  {
    path: 'airplane-types',
    canActivate: [AuthGuard],
    component: AirplaneTypesPageComponent,
  },
  {
    path: 'airports',
    canActivate: [AuthGuard],
    component: AirportsPageComponent,
  },
  {
    path: 'flights',
    canActivate: [AuthGuard],
    component: FlightsPageComponent,
  },
  {
    path: 'routes',
    canActivate: [AuthGuard],
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
