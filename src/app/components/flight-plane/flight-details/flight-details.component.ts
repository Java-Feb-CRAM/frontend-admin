import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlightService } from '../../../services/flight.service';
import { Flight } from '../../../models/Flight';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.scss'],
})
export class FlightDetailsComponent implements OnInit {
  @Input() flight: Flight | undefined;
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}

  getFlight(flightId: number): void {}
}
