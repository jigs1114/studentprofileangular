import { TestBed } from '@angular/core/testing';

import { StudentdetailService } from './studentdetail.service';

describe('StudentdetailService', () => {
  let service: StudentdetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentdetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
