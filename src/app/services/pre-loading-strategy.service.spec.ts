import { TestBed } from '@angular/core/testing';

import { PreLoadingStrategyService } from './pre-loading-strategy.service';

describe('PreLoadingStrategyService', () => {
  let service: PreLoadingStrategyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreLoadingStrategyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
