import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export interface NgRouteData {
    permission?: string | string[];
}

export interface SigningModel {
    username?: string;
    password?: string;
    captcha?: string;
}

export const ServiceHostToken = new InjectionToken('ServiceHost');

export class UserIdentity {
    readonly firstName: string;
    readonly lastName: string;
    readonly permissions: string[];
    readonly forcePasswordChange: boolean;

    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    constructor(
        firstName: string,
        lastName: string,
        permissions: string[],
        forcePasswordChange: boolean
    ) {
        if (!Array.isArray(permissions)) {
            throw new Error('invalid or null parameter: permissions');
        }

        this.firstName = firstName;
        this.lastName = lastName;
        this.permissions = permissions;
        this.forcePasswordChange = forcePasswordChange;
    }

    hasPermission(permission: string | string[]): boolean {
        if (typeof permission === 'string') {
            return this.permissions.some(x => x.toLowerCase() === permission.toLowerCase());
        } if (Array.isArray(permission)) {
            if (permission.length === 0) {
                return true;
            }
            for (const item of permission) {
                if (this.permissions.some(x => x.toLowerCase() === item.toLowerCase())) {
                    return true;
                }
            }

            return false;
        }
        throw Error('invalid value for parameter: permission');
    }
}

export abstract class AuthenticationProvider {
    abstract getCaptcha(): Observable<Blob>;
    abstract signIn(signingModel: SigningModel): Observable<any>;
    abstract changeUserPassword(currentPassword: string, newPassword: string): Observable<any>;
    abstract getUser(): Observable<UserIdentity>;
    abstract isUserAuthenticated(): boolean;
    abstract signOut(): Observable<any>;
}
