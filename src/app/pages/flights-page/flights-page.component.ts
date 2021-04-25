import { Component, OnInit, ViewChild } from '@angular/core';
import { Flight } from '../../models/Flight';
import {
  FlightTableComponent,
  FlightTableEvent,
} from '../../components/flight/flight-table/flight-table.component';
import { FlightService } from '../../services/flight.service';
import { MatDialog } from '@angular/material/dialog';
import { TableEventType } from '../../interfaces/TableEventType';
import { FlightDetailsComponent } from '../../components/flight/flight-details/flight-details.component';
import { FlightFormComponent } from '../../components/flight/flight-form/flight-form.component';
import { ConfirmDeleteComponent } from '../../components/confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-flights-page',
  templateUrl: './flights-page.component.html',
  styleUrls: ['./flights-page.component.scss'],
})
export class FlightsPageComponent implements OnInit {
  flights: Flight[] = [];
  @ViewChild(FlightTableComponent) table: FlightTableComponent | null = null;

  constructor(
    private readonly flightService: FlightService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.flightService
      .getAllFlights()
      .subscribe((data) => (this.flights = data));
  }

  findFlightById(id: number): Flight | undefined {
    return this.flights.find((flight) => flight.id === id);
  }

  handleTableEvent(event: FlightTableEvent): void {
    switch (event.eventType) {
      case TableEventType.DETAILS:
        this.showDetails(event.id);
        break;
      case TableEventType.EDIT:
        this.showUpdateForm(event.id);
        break;
      case TableEventType.DELETE:
        this.deleteFlight(event.id);
        break;
    }
  }

  showDetails(id: number): void {
    const flight = this.findFlightById(id);
    if (flight) {
      this.dialog.open(FlightDetailsComponent, {
        data: {
          flight,
        },
      });
    }
  }

  showUpdateForm(id: number): void {
    const flight = this.findFlightById(id);
    if (flight) {
      const updateDialog = this.dialog.open(FlightFormComponent, {
        data: {
          flight,
        },
      });
      updateDialog.afterClosed().subscribe((result) => {
        if (result instanceof Flight) {
          this.flightService.updateFlight(id, result).subscribe(() => {
            const index = this.flights.findIndex((f) => f.id === id);
            this.flights[index] = result;
            this.table?.update();
          });
        }
      });
    }
  }

  showCreateForm(create: boolean): void {
    if (create) {
      const createDialog = this.dialog.open(FlightFormComponent, {});
      createDialog.afterClosed().subscribe((result) => {
        if (result instanceof Flight) {
          this.flightService.createFlight(result).subscribe((data) => {
            this.flights.push(data);
            this.flights = [...this.flights].sort((a, b) => {
              if (a.id < b.id) {
                return -1;
              } else if (a.id > b.id) {
                return 1;
              } else {
                return 0;
              }
            });
            this.table?.update();
          });
        }
      });
    }
  }

  deleteFlight(id: number): void {
    const confirmDeleteDialog = this.dialog.open(ConfirmDeleteComponent, {
      width: '300px',
      data: {
        message: `Are you sure you want to delete flight ${id}?`,
      },
    });
    confirmDeleteDialog.afterClosed().subscribe((result) => {
      if (result === 'delete') {
        this.flightService.deleteFlight(id).subscribe(() => {
          this.flights = this.flights.filter((flight) => flight.id !== id);
        });
      }
    });
  }
}
