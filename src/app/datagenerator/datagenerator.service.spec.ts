import { TestBed } from '@angular/core/testing';

import { DatageneratorService } from './datagenerator.service';

describe('DatageneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatageneratorService = TestBed.get(DatageneratorService);
    expect(service).toBeTruthy();
  });
});
