import { Inject, Injectable } from '@angular/core';
import {
    CanActivate, ActivatedRouteSnapshot,
    RouterStateSnapshot, CanActivateChild, Router
} from '@angular/router';

import { NgRouteData, UserIdentity } from '../authentication/types';
import { NavigationService } from '../_services/navigation.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { Environment, EnvironmentDescriptor } from '../authentication/environment';


@Injectable({
    providedIn: 'root',
})
export class AuthorizationGuard implements CanActivate, CanActivateChild {
    private _fakeAuthentication: boolean;

    constructor(
        private router: Router,
        public navService: NavigationService,
        private authService: AuthenticationService,
        @Inject(Environment) private env: EnvironmentDescriptor,

    ) {
        this._fakeAuthentication = env.useFakeAuthenticationProvider;
    }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return this.canActivateRoute(route, state);
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return this.canActivateRoute(childRoute, state);
    }

    private async canActivateRoute(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        const authenticated = this.authService.isUserAuthenticated();

        if (authenticated) {
            const user = await this.authService.getUser();

            if (this.shouldRedirectToChangePasswordPage(user, route)) {
                this.navService.goToSetPasswordPage();
                return false;
            } 
            if (this.shouldRedirectToDashboardPage(user, route)) {
                this.navService.goToDashboardPage();
                return false;
            } 
            if (!this.hasUserPermissionToViewPage(user, route)) {
                //   TODO:
                // console.log('you have no permission to access to this route:', route);
                return false;
            }
        } else {
            if (state.url === '/login/forgot-password') {
                return true;
            }
            const goingToSigningPage = this.navService.isLoginPageRoute(route);
            if (!goingToSigningPage) {
                this.navService.goToSignInPage();
                return false;
            }
        }

        return true;
    }

    private shouldRedirectToDashboardPage(user: UserIdentity, route: ActivatedRouteSnapshot): boolean {
        return (!user.forcePasswordChange && this.navService.isChangePasswordRoute(route))
            || (user && this.navService.isLoginPageRoute(route));
    }

    private shouldRedirectToChangePasswordPage(user: UserIdentity, route: ActivatedRouteSnapshot): boolean {
        return user.forcePasswordChange
            && !this.navService.isChangePasswordRoute(route);
    }

    private hasUserPermissionToViewPage(user: UserIdentity, route: ActivatedRouteSnapshot): boolean {
        let currentState = route;
        do {
            const data: NgRouteData = currentState.data;
            const perm = data.permission;
            if (typeof perm === 'string' || Array.isArray(perm)) {
                if (!user.hasPermission(perm) && !this._fakeAuthentication) {
                    return false;
                }
            }
            currentState = currentState.children[0];
        } while (currentState);
        return true;
    }
}
