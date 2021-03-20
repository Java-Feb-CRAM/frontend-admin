import { Component, OnInit } from '@angular/core';
import { Route } from '../models/Route';
import { RouteService } from '../route.service';

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.scss'],
})
export class RouteListComponent implements OnInit {
  routes: Route[];
  constructor(private routeService: RouteService) {
    this.routes = [];
  }

  ngOnInit(): void {
    this.showRoutes();
  }

  showRoutes(): void {
    this.routeService
      .getRoutes()
      .subscribe((data: Route[]) => (this.routes = data));
  }
}
