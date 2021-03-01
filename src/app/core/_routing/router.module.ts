import { RouterModule } from '@angular/router';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { AppRoutes } from './types';
import { RouterOutletDirective } from './router-outlet.directive';

@NgModule({
    declarations: [
        RouterOutletDirective
    ],
    exports: [
        RouterOutletDirective
    ]
})
export class AppRouterModule {
    static forRoot(routes: AppRoutes) {
        return RouterModule.forRoot(routes);
    }

    static forChild(routes: AppRoutes): ModuleWithProviders<RouterModule> {
        return RouterModule.forChild(routes);
    }

    static init() {
        return RouterModule.forRoot([
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'login'
            }
        ]);
    }
}
