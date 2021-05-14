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
import { AirplaneType } from '../../../models/AirplaneType';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Airplane } from '../../../models/Airplane';

export interface AirplaneTypeTableEvent {
  id: number;
  eventType: TableEventType;
}

@Component({
  selector: 'app-airplane-type-table',
  templateUrl: './airplane-type-table.component.html',
  styleUrls: ['./airplane-type-table.component.scss'],
})
export class AirplaneTypeTableComponent implements OnChanges, AfterViewInit {
  @Input() airplaneTypes: AirplaneType[] = [];
  dataSource = new MatTableDataSource<AirplaneType>(this.airplaneTypes);
  @Output() airplaneTypeTableEvent = new EventEmitter<AirplaneTypeTableEvent>();
  @Output() addEvent = new EventEmitter<boolean>();
  displayedColumns = ['id', 'maxCapacity', 'seatLayout', 'actions'];
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
  @ViewChild(MatTable) table: MatTable<Airplane>;

  TableEventType = TableEventType;

  ngAfterViewInit(): void {
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'id':
          return item.id;
        case 'maxCapacity':
          return item.maxCapacity;
        case 'seatLayout':
          return item.seatLayout.id;
        default:
          // @ts-ignore
          return item[property];
      }
    };
    this.dataSource.filterPredicate = (data, filter) => {
      if (filter.includes(data.id.toString())) {
        return true;
      }
      if (filter.includes(data.maxCapacity.toString())) {
        return true;
      }
      if (filter.includes(data.seatLayout.id.toString())) {
        return true;
      }
      return false;
    };
  }

  onType(): void {
    this.dataSource.filter = this.filterString;
  }

  update(): void {
    this.dataSource.data = this.airplaneTypes;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  emitEvent(id: number, eventType: TableEventType): void {
    this.airplaneTypeTableEvent.emit({
      id,
      eventType,
    });
  }
}
