import { Component, OnInit, ViewChild } from '@angular/core';
import { Airport } from '../../models/Airport';
import { AirportService } from '../../services/airport.service';
import {
  AirportTableComponent,
  AirportTableEvent,
} from '../../components/airport/airport-table/airport-table.component';
import { TableEventType } from '../../interfaces/TableEventType';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from '../../components/confirm-delete/confirm-delete.component';
import { AirportFormComponent } from '../../components/airport/airport-form/airport-form.component';
import { AirportDetailsComponent } from '../../components/airport/airport-details/airport-details.component';

@Component({
  selector: 'app-airports-page',
  templateUrl: './airports-page.component.html',
  styleUrls: ['./airports-page.component.scss'],
})
export class AirportsPageComponent implements OnInit {
  airports: Airport[] = [];
  @ViewChild(AirportTableComponent) table: AirportTableComponent | null = null;

  constructor(
    private airportService: AirportService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.airportService.getAllAirports().subscribe((data) => {
      this.airports = data;
    });
  }

  findAirportById(iataId: string): Airport | undefined {
    return this.airports.find((airport) => airport.iataId === iataId);
  }

  handleTableEvent(event: AirportTableEvent): void {
    switch (event.eventType) {
      case TableEventType.DETAILS:
        this.showDetails(event.iataId);
        break;
      case TableEventType.EDIT:
        this.showUpdateForm(event.iataId);
        break;
      case TableEventType.DELETE:
        this.deleteAirport(event.iataId);
        break;
    }
  }

  showDetails(iataId: string): void {
    const airport = this.findAirportById(iataId);
    if (airport) {
      const detailsDialog = this.dialog.open(AirportDetailsComponent, {
        data: {
          airport,
        },
      });
    }
  }

  showUpdateForm(iataId: string): void {
    const airport = this.findAirportById(iataId);
    if (airport) {
      const updateDialog = this.dialog.open(AirportFormComponent, {
        data: {
          airport,
        },
      });
      updateDialog.afterClosed().subscribe((result) => {
        if (result instanceof Airport) {
          this.airportService.updateAirport(iataId, result).subscribe(() => {
            const index = this.airports.findIndex((a) => a.iataId === iataId);
            this.airports[index] = result;
            this.table?.update();
          });
        }
      });
    }
  }

  showCreateForm(create: boolean): void {
    if (create) {
      console.log('create');
      const createDialog = this.dialog.open(AirportFormComponent, {});
      createDialog.afterClosed().subscribe((result) => {
        if (result instanceof Airport) {
          this.airportService.createAirport(result).subscribe((data) => {
            this.airports.push(data);
            this.airports = this.airports.sort((a, b) => {
              if (a.iataId < b.iataId) {
                return -1;
              } else if (a.iataId > b.iataId) {
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

  deleteAirport(iataId: string): void {
    const confirmDeleteDialog = this.dialog.open(ConfirmDeleteComponent, {
      width: '300px',
      data: {
        message: `Are you sure you want to delete airport ${iataId}?`,
      },
    });
    confirmDeleteDialog.afterClosed().subscribe((result) => {
      if (result === 'delete') {
        this.airportService.deleteAirport(iataId).subscribe(() => {
          this.airports = this.airports.filter(
            (airport) => airport.iataId !== iataId
          );
        });
      }
    });
  }
}
