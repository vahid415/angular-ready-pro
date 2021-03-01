import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppSharedComponentsModule, NgbComponentsModule } from '@app/core';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';


@NgModule({
    declarations: [
        DashboardComponent
    ],
    imports: [
        DashboardRoutingModule,
        FormsModule,
        CommonModule,
        RouterModule,
        AppSharedComponentsModule,
        NgbComponentsModule
    ],
    providers: [
    ]
})
export class DashboardModule {
}
