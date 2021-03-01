import { Component, OnInit } from '@angular/core';
import { Breadcrumb, BreadcrumbItems, NavigationService } from '@app/core';

import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';

import { CustomerService } from '../../services/customer.service';

@Component({
    selector: 'app-ticketing-customer-info',
    templateUrl: './customer-info.component.html',
    styleUrls: ['./customer-info.component.scss']
})
export class CustomerInfoComponent implements OnInit {
    @Breadcrumb() breadcrumb: BreadcrumbItems = [{ text: 'customer-info' }];
    result = '';
    form: FormGroup;
    constructor(
        private service: CustomerService,
        private navService: NavigationService,
        private fb: FormBuilder
    ) {
        this.form = fb.group({
            fName: new FormControl(
                '',
                Validators.compose([
                    Validators.required,
                    Validators.pattern('[a-zA-Z]*'),
                ])
            ),
            lName: new FormControl('', Validators.required),
        });
    }

    // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
    ngOnInit(): void {
    }

    testServiceCall(): void {
        this.service.forTest().subscribe((res) => {
            this.result = res;
        });
    }
    back(): void {
        this.navService.goToDashboardPage();
    }
}
