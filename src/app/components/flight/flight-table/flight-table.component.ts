import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TableEventType } from '../../../interfaces/TableEventType';
import { Flight } from '../../../models/Flight';

export interface FlightTableEvent {
  id: number;
  eventType: TableEventType;
}

@Component({
  selector: 'app-flight-table',
  templateUrl: './flight-table.component.html',
  styleUrls: ['./flight-table.component.scss'],
})
export class FlightTableComponent implements OnChanges {
  @Input() flights: Flight[] = [];
  dataSource = new MatTableDataSource<Flight>(this.flights);
  @Output() flightTableEvent = new EventEmitter<FlightTableEvent>();
  @Output() addEvent = new EventEmitter<boolean>();
  displayedColumns = [
    'id',
    'route',
    'airplane',
    'departureTime',
    'reservedSeats',
    'seatPrice',
    'actions',
  ];
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
  @ViewChild(MatTable) table: MatTable<any>;

  TableEventType = TableEventType;

  onType(): void {
    this.dataSource.filter = this.filterString;
  }

  update(): void {
    this.dataSource.data = this.flights;
    this.table.renderRows();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  emitEvent(id: number, eventType: TableEventType): void {
    this.flightTableEvent.emit({
      id,
      eventType,
    });
  }
}
