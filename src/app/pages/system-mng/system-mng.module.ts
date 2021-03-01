import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSharedComponentsModule, NgbComponentsModule } from '@app/core';
import { SystemManagementRoutingModule } from './system-mng-routing.module';
import { SystemManagementComponent } from './components/system-mng.component';



@NgModule({
    declarations: [SystemManagementComponent],
    imports: [
        SystemManagementRoutingModule,
        CommonModule,
        AppSharedComponentsModule,
        NgbComponentsModule
    ]
})
export class SystemManagementModule { }
