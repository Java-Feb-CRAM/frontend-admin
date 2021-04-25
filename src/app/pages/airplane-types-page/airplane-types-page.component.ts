import { Component, OnInit, ViewChild } from '@angular/core';
import { AirplaneType } from '../../models/AirplaneType';
import {
  AirplaneTypeTableComponent,
  AirplaneTypeTableEvent,
} from '../../components/airplane-type/airplane-type-table/airplane-type-table.component';
import { AirplaneTypeService } from '../../services/airplane-type.service';
import { MatDialog } from '@angular/material/dialog';
import { TableEventType } from '../../interfaces/TableEventType';
import { AirplaneTypeDetailsComponent } from '../../components/airplane-type/airplane-type-details/airplane-type-details.component';
import { AirplaneTypeFormComponent } from '../../components/airplane-type/airplane-type-form/airplane-type-form.component';
import { ConfirmDeleteComponent } from '../../components/confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-airplane-types-page',
  templateUrl: './airplane-types-page.component.html',
  styleUrls: ['./airplane-types-page.component.scss'],
})
export class AirplaneTypesPageComponent implements OnInit {
  airplaneTypes: AirplaneType[] = [];
  @ViewChild(AirplaneTypeTableComponent)
  table: AirplaneTypeTableComponent | null = null;
  constructor(
    private readonly airplaneTypeService: AirplaneTypeService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.airplaneTypeService.getAllAirplaneTypes().subscribe((data) => {
      this.airplaneTypes = data;
    });
  }

  findAirplaneTypeById(id: number): AirplaneType | undefined {
    return this.airplaneTypes.find((airplaneType) => airplaneType.id === id);
  }

  handleTableEvent(event: AirplaneTypeTableEvent): void {
    switch (event.eventType) {
      case TableEventType.DETAILS:
        this.showDetails(event.id);
        break;
      case TableEventType.EDIT:
        this.showUpdateForm(event.id);
        break;
      case TableEventType.DELETE:
        this.deleteAirplaneType(event.id);
        break;
    }
  }

  showDetails(id: number): void {
    const airplaneType = this.findAirplaneTypeById(id);
    if (airplaneType) {
      this.dialog.open(AirplaneTypeDetailsComponent, {
        data: {
          airplaneType,
        },
      });
    }
  }

  showUpdateForm(id: number): void {
    const airplaneType = this.findAirplaneTypeById(id);
    if (airplaneType) {
      const updateDialog = this.dialog.open(AirplaneTypeFormComponent, {
        data: {
          airplaneType,
        },
      });
      updateDialog.afterClosed().subscribe((result) => {
        if (result instanceof AirplaneType) {
          this.airplaneTypeService
            .updateAirplaneType(id, result)
            .subscribe(() => {
              const index = this.airplaneTypes.findIndex((a) => a.id === id);
              this.airplaneTypes[index] = result;
              this.table?.update();
            });
        }
      });
    }
  }

  showCreateForm(create: boolean): void {
    if (create) {
      const createDialog = this.dialog.open(AirplaneTypeFormComponent, {});
      createDialog.afterClosed().subscribe((result) => {
        if (result instanceof AirplaneType) {
          this.airplaneTypeService
            .createAirplaneType(result)
            .subscribe((data) => {
              this.airplaneTypes.push(data);
              this.airplaneTypes = [...this.airplaneTypes].sort((a, b) => {
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

  deleteAirplaneType(id: number): void {
    const confirmDeleteDialog = this.dialog.open(ConfirmDeleteComponent, {
      width: '300px',
      data: {
        message: `Are you sure you want to delete airplane type ${id}?`,
      },
    });
    confirmDeleteDialog.afterClosed().subscribe((result) => {
      if (result === 'delete') {
        this.airplaneTypeService.deleteAirplaneType(id).subscribe(() => {
          this.airplaneTypes = this.airplaneTypes.filter(
            (airplaneType) => airplaneType.id !== id
          );
        });
      }
    });
  }
}
