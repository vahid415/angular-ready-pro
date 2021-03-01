import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DefaultAuthenticationProviderService } from './default-authentication-provider.service';


describe('DefaultAuthenticationProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DefaultAuthenticationProviderService],
    });
  });

  it('should be created', inject([DefaultAuthenticationProviderService], (service: DefaultAuthenticationProviderService) => {
    expect(service).toBeTruthy();
  }));
});
