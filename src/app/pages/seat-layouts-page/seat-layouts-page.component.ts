import { Component, OnInit } from '@angular/core';
import { SeatLayoutService } from '../../services/seat-layout.service';
import { SeatLayout } from '../../models/SeatLayout';

@Component({
  selector: 'app-seat-layouts-page',
  templateUrl: './seat-layouts-page.component.html',
  styleUrls: ['./seat-layouts-page.component.scss'],
})
export class SeatLayoutsPageComponent implements OnInit {
  constructor(private seatLayoutService: SeatLayoutService) {}
  seatLayouts: SeatLayout[] = [];

  ngOnInit(): void {
    this.seatLayoutService.getAllSeatLayouts().subscribe((layouts) => {
      this.seatLayouts = layouts;
    });
  }

  deleteSeatLayout(id: number): void {
    this.seatLayoutService.deleteSeatLayout(id).subscribe(() => {
      this.seatLayouts = this.seatLayouts.filter((layout) => layout.id !== id);
    });
  }
}
