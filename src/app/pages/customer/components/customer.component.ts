import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { Breadcrumb, BreadcrumbItems } from '@app/core';


@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent {
    constructor(
        private activatedRoute: ActivatedRoute
    ) {
    }
    @Breadcrumb() breadcrumb: BreadcrumbItems = [{ text: 'customer', path: ['./'], relativeTo: this.activatedRoute }];
}
