import { TestBed, inject } from '@angular/core/testing';

import { KoszykServiceService } from './koszyk-service.service';

describe('KoszykServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KoszykServiceService]
    });
  });

  it('should be created', inject([KoszykServiceService], (service: KoszykServiceService) => {
    expect(service).toBeTruthy();
  }));
});
