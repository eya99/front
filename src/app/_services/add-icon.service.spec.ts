import { TestBed } from '@angular/core/testing';

import { AddIconService } from './add-icon.service';

describe('AddIconService', () => {
  let service: AddIconService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddIconService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
