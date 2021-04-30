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
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-airports-page',
  templateUrl: './airports-page.component.html',
  styleUrls: ['./airports-page.component.scss'],
})
export class AirportsPageComponent implements OnInit {
  airports: Airport[] = [];
  @ViewChild(AirportTableComponent) table: AirportTableComponent | null = null;
  loading = true;
  error = false;

  constructor(
    private readonly airportService: AirportService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.airportService.getAllAirports().subscribe(
      (data) => {
        this.airports = data;
        this.loading = false;
      },
      (err) => {
        this.loading = false;
        this.error = true;
      }
    );
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 20 * 1000,
      verticalPosition: 'top',
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
      this.dialog.open(AirportDetailsComponent, {
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
          this.airportService.updateAirport(iataId, result).subscribe(
            () => {
              this.openSnackBar('✅ Airport updated', 'Close');
              const index = this.airports.findIndex((a) => a.iataId === iataId);
              this.airports[index] = result;
              this.table?.update();
            },
            (err) => {
              const error = err.error.message || 'Unable to update Airport';
              this.openSnackBar(`❌ ${error}`, 'Close');
            }
          );
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
          this.airportService.createAirport(result).subscribe(
            (data) => {
              this.openSnackBar('✅ Airport created', 'Close');
              this.airports.push(data);
              this.airports = [...this.airports].sort((a, b) =>
                b.iataId.localeCompare(a.iataId)
              );
              this.table?.update();
            },
            (err) => {
              const error = err.error.message || 'Unable to create Airport';
              this.openSnackBar(`❌ ${error}`, 'Close');
            }
          );
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
        this.airportService.deleteAirport(iataId).subscribe(
          () => {
            this.openSnackBar('✅ Airport deleted', 'Close');
            this.airports = this.airports.filter(
              (airport) => airport.iataId !== iataId
            );
          },
          (err) => {
            const error = err.error.message || 'Unable to delete Airport';
            this.openSnackBar(`❌ ${error}`, 'Close');
          }
        );
      }
    });
  }
}
