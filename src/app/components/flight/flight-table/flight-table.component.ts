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
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TableEventType } from '../../../interfaces/TableEventType';
import { Flight } from '../../../models/Flight';
import { DatePipe } from '@angular/common';

export interface FlightTableEvent {
  id: number;
  eventType: TableEventType;
}

@Component({
  selector: 'app-flight-table',
  templateUrl: './flight-table.component.html',
  styleUrls: ['./flight-table.component.scss'],
})
export class FlightTableComponent implements OnChanges, AfterViewInit {
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
  @ViewChild(MatTable) table: MatTable<Flight>;

  TableEventType = TableEventType;

  ngAfterViewInit(): void {
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'id':
          return item.id;
        case 'route':
          return (
            item.route.originAirport.iataId +
            ' ' +
            item.route.destinationAirport.iataId
          );
        case 'airplane':
          return item.airplane.id;
        case 'departureTime':
          return item.departureTime;
        case 'reservedSeats':
          return item.reservedSeats;
        case 'seatPrice':
          return item.seatPrice;
        default:
          // @ts-ignore
          return item[property];
      }
    };
    const pipe = new DatePipe('en-US');
    this.dataSource.filterPredicate = (data, filter) => {
      if (filter.includes(data.id.toString())) {
        return true;
      }
      if (filter.includes(data.airplane.id.toString())) {
        return true;
      }
      if (filter.includes(data.reservedSeats.toString())) {
        return true;
      }
      if (data.seatPrice.toString().includes(filter)) {
        return true;
      }
      const short = pipe.transform(data.departureTime, 'short');
      if (short?.includes(filter)) {
        return true;
      }
      const combined =
        data.route.originAirport.iataId +
        ' ' +
        data.route.destinationAirport.iataId;
      if (combined.toLowerCase().includes(filter.toLowerCase())) {
        return true;
      }
      return false;
    };
  }

  onType(): void {
    this.dataSource.filter = this.filterString;
  }

  update(): void {
    this.dataSource.data = this.flights;
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
