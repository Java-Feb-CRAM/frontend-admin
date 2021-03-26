import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Airport } from '../../../models/Airport';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-flight-table',
  templateUrl: './flight-table.component.html',
  styleUrls: ['./flight-table.component.scss'],
})
export class FlightTableComponent implements OnChanges {
  @Input() dataSource = new MatTableDataSource<Airport>();
  displayedColumns = ['iataId', 'city', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
