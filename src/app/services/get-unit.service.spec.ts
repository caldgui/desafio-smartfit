import { TestBed } from '@angular/core/testing';

import { GetUnitService } from './get-unit.service';

describe('GetUnitService', () => {
  let service: GetUnitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetUnitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
