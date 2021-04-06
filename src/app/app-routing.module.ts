import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexPageComponent } from './pages/index-page/index-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { AirportsPageComponent } from './pages/airports-page/airports-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: '',
    component: IndexPageComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'airports',
        canActivateChild: [AuthGuard],
        component: AirportsPageComponent,
      },
    ],
  },
  {
    path: '**',
    canActivate: [AuthGuard],
    component: NotFoundPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
