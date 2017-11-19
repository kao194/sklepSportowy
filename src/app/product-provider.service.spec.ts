import { TestBed, inject } from '@angular/core/testing';

import { ProductProviderService } from './product-provider.service';

describe('ProductProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductProviderService]
    });
  });

  it('should be created', inject([ProductProviderService], (service: ProductProviderService) => {
    expect(service).toBeTruthy();
  }));
});
