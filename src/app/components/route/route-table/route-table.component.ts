import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { TableEventType } from '../../../interfaces/TableEventType';
import { Route } from '../../../models/Route';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export interface RouteTableEvent {
  id: number;
  eventType: TableEventType;
}

@Component({
  selector: 'app-route-table',
  templateUrl: './route-table.component.html',
  styleUrls: ['./route-table.component.scss'],
})
export class RouteTableComponent implements OnChanges, AfterViewInit {
  @Input() routes: Route[] = [];
  dataSource = new MatTableDataSource<Route>(this.routes);
  @Output() routeTableEvent = new EventEmitter<RouteTableEvent>();
  @Output() addEvent = new EventEmitter<boolean>();
  displayedColumns = ['id', 'origin', 'destination', 'actions'];
  filterString = '';
  @ViewChild(MatPaginator, { static: false })
  set paginator(value: MatPaginator) {
    if (this.dataSource) {
      this.dataSource.paginator = value;
    }
  }
  @ViewChild(MatSort, { static: false })
  set sort(value: MatSort) {
    if (this.dataSource) {
      this.dataSource.sort = value;
    }
  }

  // @ts-ignore
  @ViewChild(MatTable) table: MatTable<Route>;

  TableEventType = TableEventType;
  ngAfterViewInit(): void {
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'id':
          return item.id;
        case 'origin':
          return item.originAirport.iataId;
        case 'destination':
          return item.destinationAirport.iataId;
        default:
          // @ts-ignore
          return item[property];
      }
    };
    this.dataSource.filterPredicate = (data, filter) => {
      if (filter.includes(data.id.toString())) {
        return true;
      }
      if (
        data.originAirport.iataId.toLowerCase().includes(filter.toLowerCase())
      ) {
        return true;
      }
      if (
        data.destinationAirport.iataId
          .toLowerCase()
          .includes(filter.toLowerCase())
      ) {
        return true;
      }
      return false;
    };
  }

  onType(): void {
    this.dataSource.filter = this.filterString;
  }

  update(): void {
    this.dataSource.data = this.routes;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  emitEvent(id: number, eventType: TableEventType): void {
    this.routeTableEvent.emit({
      id,
      eventType,
    });
  }
}
