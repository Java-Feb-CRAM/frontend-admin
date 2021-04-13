import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { TableEventType } from '../../../interfaces/TableEventType';
import { Airplane } from '../../../models/Airplane';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export interface AirplaneTableEvent {
  id: number;
  eventType: TableEventType;
}

@Component({
  selector: 'app-airplane-table',
  templateUrl: './airplane-table.component.html',
  styleUrls: ['./airplane-table.component.scss'],
})
export class AirplaneTableComponent implements OnChanges {
  @Input() airplanes: Airplane[] = [];
  dataSource = new MatTableDataSource<Airplane>(this.airplanes);
  @Output() airplaneTableEvent = new EventEmitter<AirplaneTableEvent>();
  @Output() addEvent = new EventEmitter<boolean>();
  displayedColumns = ['id', 'airplaneType', 'actions'];
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
    this.dataSource.data = this.airplanes;
    //this.table.renderRows();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  emitEvent(id: number, eventType: TableEventType): void {
    this.airplaneTableEvent.emit({
      id,
      eventType,
    });
  }
}
