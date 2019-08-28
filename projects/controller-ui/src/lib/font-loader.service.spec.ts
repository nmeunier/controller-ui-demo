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

  it('should load font', inject([FontLoaderService], async (service: FontLoaderService) => {
    const fontName = await service.load('Pathway Gothic One', 'google');
    expect(fontName).toEqual('Pathway Gothic One');
  }));

  it('should load font twice', inject([FontLoaderService], async (service: FontLoaderService) => {
    await service.load('Pathway Gothic One', 'google');
    const fontName = await service.load('Pathway Gothic One', 'google');
    expect(fontName).toEqual('Pathway Gothic One');
  }));

  it('should load font twice async ', inject([FontLoaderService], async (service: FontLoaderService) => {
    service.load('Pathway Gothic One', 'google');
    const fontName = await service.load('Pathway Gothic One', 'google');
    expect(fontName).toEqual('Pathway Gothic One');
  }));
});
