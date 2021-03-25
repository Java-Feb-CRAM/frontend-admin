import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

export enum DataTableEventType {
  DETAILS,
  EDIT,
  DELETE,
}

export interface DataTableEvent {
  type: DataTableEventType;
  id: number;
}

export enum CellStyle {
  NONE,
  HTML,
  DATE,
  MONEY,
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit {
  @Input() itemsPerPage = 10;
  @Input() items: any[] = [];
  @Input() headers: string[] = [];
  @Input() keys: string[][] = [];
  @Input() cellStyles: CellStyle[] = [];
  @Input() details = false;
  @Input() edit = false;
  @Input() delete = false;
  @Output() dataTableEvents = new EventEmitter<DataTableEvent>();
  CellStyle = CellStyle;
  currentPage = 1;
  constructor() {}

  ngOnInit(): void {}

  get totalItemsCount(): number {
    return this.items.length;
  }

  findValue(item: any, nestedKey: string[]): any {
    let previous: any = item;
    for (const key of nestedKey) {
      previous = previous[key];
    }
    return previous;
  }

  clickDetails(item: any): void {
    if (item.id) {
      this.dataTableEvents.emit({
        type: DataTableEventType.DETAILS,
        id: item.id,
      });
    }
  }

  clickEdit(item: any): void {
    if (item.id) {
      this.dataTableEvents.emit({
        type: DataTableEventType.EDIT,
        id: item.id,
      });
    }
  }

  clickDelete(item: any): void {
    if (item.id) {
      this.dataTableEvents.emit({
        type: DataTableEventType.DELETE,
        id: item.id,
      });
    }
  }
}
