import { TestBed } from '@angular/core/testing';

import { ImagenfsService } from './imagenfs.service';

describe('ImagenfsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImagenfsService = TestBed.get(ImagenfsService);
    expect(service).toBeTruthy();
  });
});
