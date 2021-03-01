
import { Injectable } from '@angular/core';
import { UserIdentity } from './types';
import { AuthenticationService } from './authentication.service';

@Injectable({
    providedIn: 'root'
})
export class UserIdentityService {
    // eslint-disable-next-line no-useless-constructor
    constructor(
        private authService: AuthenticationService,
    // eslint-disable-next-line no-empty-function
    ) { }

    get user(): UserIdentity {
        // Since this method is called after User resolution,
        // We are sure that user promise is resolved, so it's type is UserIdentity
        return this.authService.getUser() as UserIdentity;
    }
}
