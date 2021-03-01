import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { Service1Service } from './service1.service';

describe('Service1Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Service1Service],
    });
  });

  it('should be created', inject([Service1Service], (service: Service1Service) => {
    expect(service).toBeTruthy();
  }));
});
