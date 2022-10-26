import { MomentService } from './moment.service';
import { TestBed } from '@angular/core/testing';


describe('MommentsService', () => {
  let service: MomentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MomentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
