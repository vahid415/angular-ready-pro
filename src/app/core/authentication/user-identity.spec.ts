import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationProvider, DefaultAuthenticationProviderService, UserIdentityService } from '../..';


describe('UserIdentityService', () => {
    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UserIdentityService,
                { provide: AuthenticationProvider, useClass: DefaultAuthenticationProviderService, multi: false }
            ],
        });
    });

    it('should be created', inject([UserIdentityService], (service: UserIdentityService) => {
        expect(service).toBeTruthy();
    }));
});
