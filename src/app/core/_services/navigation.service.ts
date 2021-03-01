import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Router, ActivatedRouteSnapshot } from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    previousUrl: Observable<any> = new Subject();
    // eslint-disable-next-line no-useless-constructor
    constructor(
        private router: Router,
    // eslint-disable-next-line no-empty-function
    ) {
    }

    goToDashboardPage(): void {
        this.router.navigate(['/pages/dashboard']);
    }

    goToTargetPage(url: string): void {
        this.router.navigate([url]);
    }

    goToPreviousPage(): void {
        this.previousUrl.subscribe((res: string) => {
            this.router.navigate([res]);
        });
    }

    goToSignInPage(): void {
        this.router.navigateByUrl('login');
    }

    goToSetPasswordPage(): void {
        this.router.navigateByUrl('login/change-password');
    }

    isChangePasswordRoute(route: ActivatedRouteSnapshot): boolean {
        return this.checkRoutePageKey(route, 'change-password');
    }

    goToErrorPage(): void {
        this.router.navigateByUrl('internal-error');
    }

    isLoginPageRoute(route: ActivatedRouteSnapshot): boolean {
        return this.checkRoutePageKey(route, 'login');
    }

    private checkRoutePageKey(route: ActivatedRouteSnapshot, pageKey: string): boolean {
        return route.children
            && route.children[0]
            && route.children[0].data
            && route.children[0].data.pageKey === pageKey;
    }
}
