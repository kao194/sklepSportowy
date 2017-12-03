import { TestBed, inject } from '@angular/core/testing';

import { PromocjeServiceService } from './promocje-service.service';

describe('PromocjeServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PromocjeServiceService]
    });
  });

  it('should be created', inject([PromocjeServiceService], (service: PromocjeServiceService) => {
    expect(service).toBeTruthy();
  }));
});
