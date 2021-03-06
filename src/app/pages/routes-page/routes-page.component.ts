import { Component, OnInit, ViewChild } from '@angular/core';
import { Route } from '../../models/Route';
import {
  RouteTableComponent,
  RouteTableEvent,
} from '../../components/route/route-table/route-table.component';
import { RouteService } from '../../services/route.service';
import { MatDialog } from '@angular/material/dialog';
import { TableEventType } from '../../interfaces/TableEventType';
import { RouteDetailsComponent } from '../../components/route/route-details/route-details.component';
import { RouteFormComponent } from '../../components/route/route-form/route-form.component';
import { ConfirmDeleteComponent } from '../../components/confirm-delete/confirm-delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-routes-page',
  templateUrl: './routes-page.component.html',
  styleUrls: ['./routes-page.component.scss'],
})
export class RoutesPageComponent implements OnInit {
  routes: Route[] = [];
  @ViewChild(RouteTableComponent) table: RouteTableComponent | null = null;
  loading = true;
  error = false;

  constructor(
    private readonly routeService: RouteService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.routeService.getAllRoutes().subscribe(
      (data) => {
        this.routes = data;
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

  findRouteById(id: number): Route | undefined {
    return this.routes.find((route) => route.id === id);
  }

  handleTableEvent(event: RouteTableEvent): void {
    switch (event.eventType) {
      case TableEventType.DETAILS:
        this.showDetails(event.id);
        break;
      case TableEventType.EDIT:
        this.showUpdateForm(event.id);
        break;
      case TableEventType.DELETE:
        this.deleteRoute(event.id);
        break;
    }
  }

  showDetails(id: number): void {
    const route = this.findRouteById(id);
    if (route) {
      this.dialog.open(RouteDetailsComponent, {
        data: {
          route,
        },
      });
    }
  }

  showUpdateForm(id: number): void {
    const route = this.findRouteById(id);
    if (route) {
      const updateDialog = this.dialog.open(RouteFormComponent, {
        data: {
          route,
        },
      });
      updateDialog.afterClosed().subscribe((result) => {
        if (result instanceof Route) {
          this.routeService.updateRoute(id, result).subscribe(
            () => {
              this.openSnackBar('??? Route updated', 'Close');
              const index = this.routes.findIndex((r) => r.id === id);
              this.routes[index] = result;
              this.table?.update();
            },
            (err) => {
              const error = err.error.message || 'Unable to update Route';
              this.openSnackBar(`??? ${error}`, 'Close');
            }
          );
        }
      });
    }
  }

  showCreateForm(create: boolean): void {
    if (create) {
      const createDialog = this.dialog.open(RouteFormComponent, {});
      createDialog.afterClosed().subscribe((result) => {
        if (result instanceof Route) {
          this.routeService.createRoute(result).subscribe(
            (data) => {
              this.openSnackBar('??? Route created', 'Close');
              this.routes.push(data);
              this.routes = [...this.routes].sort((a, b) => {
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
              const error = err.error.message || 'Unable to create Route';
              this.openSnackBar(`??? ${error}`, 'Close');
            }
          );
        }
      });
    }
  }

  deleteRoute(id: number): void {
    const confirmDeleteDialog = this.dialog.open(ConfirmDeleteComponent, {
      width: '300px',
      data: {
        message: `Are you sure you want to delete route ${id}?`,
      },
    });
    confirmDeleteDialog.afterClosed().subscribe((result) => {
      if (result === 'delete') {
        this.routeService.deleteRoute(id).subscribe(
          () => {
            this.openSnackBar('??? Route deleted', 'Close');
            this.routes = this.routes.filter((route) => route.id !== id);
          },
          (err) => {
            const error = err.error.message || 'Unable to delete Route';
            this.openSnackBar(`??? ${error}`, 'Close');
          }
        );
      }
    });
  }
}
