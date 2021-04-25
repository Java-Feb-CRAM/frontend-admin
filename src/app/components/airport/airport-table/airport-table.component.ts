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
import { Airport } from '../../../models/Airport';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TableEventType } from '../../../interfaces/TableEventType';

export interface AirportTableEvent {
  iataId: string;
  eventType: TableEventType;
}

@Component({
  selector: 'app-airport-table',
  templateUrl: './airport-table.component.html',
  styleUrls: ['./airport-table.component.scss'],
})
export class AirportTableComponent implements OnChanges {
  @Input() airports: Airport[] = [];
  dataSource = new MatTableDataSource<Airport>(this.airports);
  @Output() airportTableEvent = new EventEmitter<AirportTableEvent>();
  @Output() addEvent = new EventEmitter<boolean>();
  displayedColumns = ['iataId', 'city', 'actions'];
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
    this.dataSource.data = this.airports;
    this.table?.renderRows();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  emitEvent(iataId: string, eventType: TableEventType): void {
    this.airportTableEvent.emit({
      iataId,
      eventType,
    });
  }
}
