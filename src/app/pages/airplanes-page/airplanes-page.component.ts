import { Component, OnInit, ViewChild } from '@angular/core';
import { Airplane } from '../../models/Airplane';
import {
  AirplaneTableComponent,
  AirplaneTableEvent,
} from '../../components/airplane/airplane-table/airplane-table.component';
import { AirplaneService } from '../../services/airplane.service';
import { MatDialog } from '@angular/material/dialog';
import { TableEventType } from '../../interfaces/TableEventType';
import { AirplaneDetailsComponent } from '../../components/airplane/airplane-details/airplane-details.component';
import { AirplaneFormComponent } from '../../components/airplane/airplane-form/airplane-form.component';
import { ConfirmDeleteComponent } from '../../components/confirm-delete/confirm-delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-airplanes-page',
  templateUrl: './airplanes-page.component.html',
  styleUrls: ['./airplanes-page.component.scss'],
})
export class AirplanesPageComponent implements OnInit {
  airplanes: Airplane[] = [];
  @ViewChild(AirplaneTableComponent)
  table: AirplaneTableComponent | null = null;
  loading = true;
  error = false;
  constructor(
    private readonly airplaneService: AirplaneService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.airplaneService.getAllAirplanes().subscribe(
      (data) => {
        this.airplanes = data;
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

  findAirplaneById(id: number): Airplane | undefined {
    return this.airplanes.find((airplane) => airplane.id === id);
  }

  handleTableEvent(event: AirplaneTableEvent): void {
    switch (event.eventType) {
      case TableEventType.DETAILS:
        this.showDetails(event.id);
        break;
      case TableEventType.EDIT:
        this.showUpdateForm(event.id);
        break;
      case TableEventType.DELETE:
        this.deleteAirplane(event.id);
        break;
    }
  }

  showDetails(id: number): void {
    const airplane = this.findAirplaneById(id);
    if (airplane) {
      this.dialog.open(AirplaneDetailsComponent, {
        data: {
          airplane,
        },
      });
    }
  }

  showUpdateForm(id: number): void {
    const airplane = this.findAirplaneById(id);
    if (airplane) {
      const updateDialog = this.dialog.open(AirplaneFormComponent, {
        data: {
          airplane,
        },
      });
      updateDialog.afterClosed().subscribe((result) => {
        if (result instanceof Airplane) {
          this.airplaneService.updateAirplane(id, result).subscribe(
            () => {
              this.openSnackBar('✅ Airplane updated', 'Close');
              const index = this.airplanes.findIndex((a) => a.id === id);
              this.airplanes[index] = result;
              this.table?.update();
            },
            (err) => {
              const error = err.error.message || 'Unable to update Airplane';
              this.openSnackBar(`❌ ${error}`, 'Close');
            }
          );
        }
      });
    }
  }

  showCreateForm(create: boolean): void {
    if (create) {
      const createDialog = this.dialog.open(AirplaneFormComponent, {});
      createDialog.afterClosed().subscribe((result) => {
        if (result instanceof Airplane) {
          this.airplaneService.createAirplane(result).subscribe(
            (data) => {
              this.openSnackBar('✅ Airplane created', 'Close');
              this.airplanes.push(data);
              this.airplanes = [...this.airplanes].sort((a, b) => {
                if (a.id < b.id) {
                  return -1;
                } else if (a.id > b.id) {
                  return 1;
                } else {
                  return 0;
                }
              });
              this.table?.update();
            },
            (err) => {
              const error = err.error.message || 'Unable to create Airplane';
              this.openSnackBar(`❌ ${error}`, 'Close');
            }
          );
        }
      });
    }
  }

  deleteAirplane(id: number): void {
    const confirmDeleteDialog = this.dialog.open(ConfirmDeleteComponent, {
      width: '300px',
      data: {
        message: `Are you sure you want to delete airplane ${id}?`,
      },
    });
    confirmDeleteDialog.afterClosed().subscribe((result) => {
      if (result === 'delete') {
        this.airplaneService.deleteAirplane(id).subscribe(
          () => {
            this.openSnackBar('✅ Airplane deleted', 'Close');
            this.airplanes = this.airplanes.filter(
              (airplane) => airplane.id !== id
            );
          },
          (err) => {
            const error = err.error.message || 'Unable to delete Airplane';
            this.openSnackBar(`❌ ${error}`, 'Close');
          }
        );
      }
    });
  }
}
