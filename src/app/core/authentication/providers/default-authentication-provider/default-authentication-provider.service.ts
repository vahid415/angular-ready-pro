import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map, concatMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthenticationProvider, SigningModel, UserIdentity } from '../../types';

@Injectable()
export class DefaultAuthenticationProviderService implements AuthenticationProvider {
    baseUrl = 'api/security/';

    // eslint-disable-next-line no-useless-constructor
    constructor(
        private httpClient: HttpClient
        // eslint-disable-next-line no-empty-function
    ) { }

    changeUserPassword(currentPassword: string, newPassword: string): Observable<any> {
        return this.httpClient.post<any>(`${this.baseUrl}set-password`, {
            currentPassword,
            newPassword
        });
    }

    getCaptcha(): Observable<Blob> {
        return this.httpClient.post(`${this.baseUrl}${'get-captcha'}`, {}, { responseType: 'blob' });
    }

    signIn(signingModel?: SigningModel): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.append('Authorization', `Basic ${btoa('any')}`);
        const body = new FormData();
        // body.append('username', signingModel.username);
        // body.append('password', signingModel.password);
        // body.append('captcha', signingModel.captcha);
        body.append('grant_type', 'password');
        return this.httpClient.post<any>(`${this.baseUrl}${'login'}`, body, { headers })
            .pipe(
                concatMap(res => this.httpClient.post(`${this.baseUrl}${'set-cookie'}`, {}))
            );
    }

    getUser(): Observable<UserIdentity> {
        return this.httpClient.post<any>(`${this.baseUrl}${'get-user'}`, {})
            .pipe(
                map(x => new UserIdentity(
                    x.firstName,
                    x.lastName,
                    [],
                    x.forcePasswordChange
                ))
            );
    }

    signOut(): Observable<any> {
        return this.httpClient.post(`${this.baseUrl}${'logout'}`, {})
            .pipe(
                map(res => true)
            );
    }

    isUserAuthenticated(): boolean {
        const parts = document.cookie.split(';');
        for (const part of parts) {
            const keyValue = part.split('=');
            if (keyValue.length === 2) {
                const key = keyValue[0].trim();
                const value = keyValue[1].trim();
                if (key === 'access_token' && typeof value === 'string') {
                    return true;
                }
            }
        }

        return false;
    }
}
