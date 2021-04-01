import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private userService: UserService) {
    this.isLoggedIn$ = this.userService.loggedIn()
  }
  isLoggedIn$ = false;

  navigation = [
    { link: 'airplanes', label: 'Airplanes' },
    { link: 'airplane-types', label: 'Airplane Types' },
    { link: 'airports', label: 'Airports' },
    { link: 'flights', label: 'Flights' },
    { link: 'routes', label: 'Routes' },
  ];

  logout(): void {
    this.userService.logout()
    this.isLoggedIn$ = false
  }
}
