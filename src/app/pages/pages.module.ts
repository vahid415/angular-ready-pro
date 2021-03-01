import { NgModule, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { APP_WINDOW, UserAreaLayoutModule, AppRouterModule } from '@app/core';

import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';

export function windowFactory(platformId: Object): Window | undefined {
    if (isPlatformBrowser(platformId)) {
        return window;
    }
    return undefined;
}
@NgModule({
    declarations: [
        PagesComponent
    ],

    imports: [
        PagesRoutingModule,
        CommonModule,
        AppRouterModule,
        UserAreaLayoutModule,

    ],
    providers: [{ provide: APP_WINDOW, useFactory: windowFactory, deps: [PLATFORM_ID] },
    ],
})
export class PagesModule {

}

