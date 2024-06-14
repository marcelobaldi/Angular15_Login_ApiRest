import { TestBed } from '@angular/core/testing';

import { RoutesGuardService } from './routes-guard.service';

describe('RoutesGuardService', () => {
  let service: RoutesGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutesGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
