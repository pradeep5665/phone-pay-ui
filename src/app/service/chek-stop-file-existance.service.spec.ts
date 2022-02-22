import { TestBed } from '@angular/core/testing';

import { ChekStopFileExistanceService } from './chek-stop-file-existance.service';

describe('ChekStopFileExistanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChekStopFileExistanceService = TestBed.get(ChekStopFileExistanceService);
    expect(service).toBeTruthy();
  });
});
