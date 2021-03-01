import { Subject, Observable } from 'rxjs';
import { tap, concatMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { UserIdentity, AuthenticationProvider, SigningModel } from './types';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    signedIn;
    signedOut;
    private user: UserIdentity | Promise<UserIdentity> = new UserIdentity('Admin', 'LastName', ['0000'], false);
    private signedInSubject = new Subject<any>();
    private signedOutSubject = new Subject<any>();

    constructor(
        private authProvider: AuthenticationProvider,
    ) {
        this.signedIn = this.signedInSubject.asObservable();
        this.signedOut = this.signedOutSubject.asObservable();
        if (!authProvider) {
            throw new Error('No authentication provider is registerd.');
        }
    }

    getCaptcha(): Observable<Blob> {
        return this.authProvider.getCaptcha();
    }

    signIn(signingModel: SigningModel): Observable<any> {
        return this.authProvider.signIn(signingModel).pipe(
            tap(res => {
                this.signedInSubject.next();
            })
        );
    }

    signOut(): Observable<any> {
        return this.authProvider.signOut().pipe(
            tap(x => {
                this.user = null as UserIdentity;
                this.signedOutSubject.next();
            })
        );
    }


    changeUserPassword(currentPassword: string, newPassword: string): Observable<any> {
        return this.authProvider.changeUserPassword(currentPassword, newPassword)
            .pipe(
                concatMap(x => this.getUser(true) as Promise<any>)
            );
    }

    isUserAuthenticated(): boolean {
        return this.authProvider.isUserAuthenticated();
    }

    getUser(forceReload = false): UserIdentity | Promise<UserIdentity> {
        if (!this.isUserAuthenticated()) {
            // TODO: error in test
            // console.log('invalid operation. user is not authenticated.');
            // throw Error('invalid operation. user is not authenticated.');
        }

        if (forceReload) {
            this.user = {} as UserIdentity;
        }

        if (this.user) {
            return this.user;
        }
        this.user = this.authProvider.getUser().toPromise();
        this.user.then(x => { this.user = x; });
        return this.user;
    }

    clearUser(): void {
        this.user = {} as UserIdentity;
    }
}
