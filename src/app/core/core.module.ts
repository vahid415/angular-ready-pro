import { HttpClientModule } from '@angular/common/http';
import {
    ModuleWithProviders, NgModule,
    Optional, SkipSelf
} from '@angular/core';
import { environment } from '@app/env/environment';
import { Environment } from './authentication/environment';
import { ApiModule } from './_http/api.module';
import {
    FakeAuthenticationProviderModule
} from './authentication/providers/fake-authentication-provider/fake-authentication-provider.module';
import {
    DefaultAuthenticationProviderModule
} from './authentication/providers/default-authentication-provider/default-authentication-provider.module';
import { LayoutDirection, LAYOUT_DIRECTION } from './_services/direction.service';
import { AppRouterModule } from './_routing/router.module';

export function throwIfAlreadyLoaded(parentModule: any, moduleName: string): void {
    if (parentModule) {
        throw new Error(`${moduleName} has already been loaded. Import Core modules in the AppModule only.`);
    }
}

export const CORE_PROVIDERS = [

];


@NgModule({
    imports: [
        environment.useFakeAuthenticationProvider ? FakeAuthenticationProviderModule : DefaultAuthenticationProviderModule,
        ApiModule,
        AppRouterModule,
        HttpClientModule
    ],
    exports: [
    ],
    providers: [

    ]
})

export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }

    static forRoot(layoutDirection?: LayoutDirection): ModuleWithProviders<CoreModule> {
        return {
            ngModule: CoreModule,
            providers: [
                { provide: Environment, useValue: environment },
                { provide: LAYOUT_DIRECTION, useValue: layoutDirection || LayoutDirection.LTR }]
        };
    }
}
