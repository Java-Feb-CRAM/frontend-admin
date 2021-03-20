import { TestBed } from '@angular/core/testing';

import { AirplaneTypeService } from './airplane-type.service';

describe('AirplaneTypeService', () => {
  let service: AirplaneTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirplaneTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
