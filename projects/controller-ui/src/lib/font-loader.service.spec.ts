import { TestBed, inject } from '@angular/core/testing';

import { FontLoaderService } from './font-loader.service';

describe('FontLoaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FontLoaderService]
    });
  });

  it('should be created', inject([FontLoaderService], (service: FontLoaderService) => {
    expect(service).toBeTruthy();
  }));
});
