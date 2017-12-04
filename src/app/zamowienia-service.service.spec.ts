import { TestBed, inject } from '@angular/core/testing';

import { ZamowieniaServiceService } from './zamowienia-service.service';

describe('ZamowieniaServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ZamowieniaServiceService]
    });
  });

  it('should be created', inject([ZamowieniaServiceService], (service: ZamowieniaServiceService) => {
    expect(service).toBeTruthy();
  }));
});
