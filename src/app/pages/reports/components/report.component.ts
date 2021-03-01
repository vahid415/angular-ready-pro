import { Component } from '@angular/core';
import { Breadcrumb, BreadcrumbItem } from '@app/core';

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.scss']
})
export class ReportComponent {
    @Breadcrumb() breadcrumb: BreadcrumbItem = { text: 'reports' };
}

