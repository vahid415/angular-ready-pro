import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSharedComponentsModule, NgbComponentsModule } from '@app/core';
import { ReportComponent } from './components/report.component';
import { ReportRoutingModule } from './report-routing.module';



@NgModule({
    declarations: [ReportComponent],
    imports: [
        ReportRoutingModule,
        CommonModule,
        AppSharedComponentsModule,
        NgbComponentsModule
    ]
})
export class ReportModule { }
