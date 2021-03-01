import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Service1Service } from './services/service1.service';

export const SHARED_PROVIDERS = [Service1Service,
];
@NgModule({
    imports: [
        CommonModule,
    ],
    exports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders<SharedModule> {
        return {
            ngModule: SharedModule,
            providers: [...SHARED_PROVIDERS]
        };
    }
}
