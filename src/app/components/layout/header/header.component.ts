import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isLoggedIn$ = false;

  navigation = [
    { link: 'airplanes', label: 'Airplanes' },
    { link: 'airplane-types', label: 'Airplane Types' },
    { link: 'airports', label: 'Airports' },
    { link: 'flights', label: 'Flights' },
    { link: 'routes', label: 'Routes' },
  ];
}
