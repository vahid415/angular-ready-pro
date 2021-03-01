import { Component } from '@angular/core';
import { Breadcrumb, BreadcrumbItem } from '@app/core';

@Component({
    selector: 'app-system-mng',
    templateUrl: './system-mng.component.html',
    styleUrls: ['./system-mng.component.scss']
})
export class SystemManagementComponent {
    @Breadcrumb() breadcrumb: BreadcrumbItem = { text: 'setting' };
}
