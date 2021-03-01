import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FakeAuthenticationProviderService } from '@app/core';


describe('FakeAuthenticationProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FakeAuthenticationProviderService],
    });
  });

  it('should be created', inject([FakeAuthenticationProviderService], (service: FakeAuthenticationProviderService) => {
    expect(service).toBeTruthy();
  }));
});
