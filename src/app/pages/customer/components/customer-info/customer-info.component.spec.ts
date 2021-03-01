import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AppSharedComponentsModule } from '@app/core';
import { CustomerService } from '../../services/customer.service';

import { CustomerInfoComponent } from './customer-info.component';

describe('CustomerInfoComponent', () => {
    let component: CustomerInfoComponent;
    let fixture: ComponentFixture<CustomerInfoComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CustomerInfoComponent],
            imports: [AppSharedComponentsModule, ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
            providers: [CustomerService]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CustomerInfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
