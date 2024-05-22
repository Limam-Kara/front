import { TestBed } from '@angular/core/testing';

import { EndroitService } from './endroit.service';

describe('EndroitService', () => {
  let service: EndroitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EndroitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
