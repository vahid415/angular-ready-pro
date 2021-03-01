import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationProvider, UserIdentity, SigningModel } from '../../types';


@Injectable()
export class FakeAuthenticationProviderService implements AuthenticationProvider {
    readonly accessTokenLocalStorageKey = 'access_token';
    private user = new UserIdentity('Admin', 'LastName', ['/', 'p1', 'p2'], false);

    constructor(private httpClient: HttpClient) {
    }

    changeUserPassword(currentPassword: string, newPassword: string): Observable<any> {
        this.user = new UserIdentity('Admin', 'LastName', ['p0', 'p1', 'p2'], false);
        return of(true);
    }



    signIn(signingModel: SigningModel): Observable<any> {
        // TODO:
        // console.log('FakeAuthProvider: Signed In.');
        localStorage.setItem(this.accessTokenLocalStorageKey, 'FAKE_ACCESS_TOKEN');
        return of(true);
    }

    getCaptcha(): Observable<Blob> {
        // TODO:
        // console.log('FakeAuthProvider: Captcha Retrieved.');
        return this.httpClient.get('assets/template/img/captcha.png', { responseType: 'blob' });
    }

    getUser(): Observable<UserIdentity> {
        return of(this.user);
    }

    signOut(): Observable<any> {
        // TODO:
        // console.log('FakeAuthProvider: Signed Out.');
        localStorage.removeItem(this.accessTokenLocalStorageKey);
        return of(0);
    }

    isUserAuthenticated(): boolean {
        return localStorage.getItem(this.accessTokenLocalStorageKey) != null;
    }
}
