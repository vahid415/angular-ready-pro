import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppSharedComponentsModule, NgbComponentsModule } from '@app/core';

import { RequestComponent } from './request.component';

describe('RequestComponent', () => {
    let component: RequestComponent;
    let fixture: ComponentFixture<RequestComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RequestComponent],
            imports: [AppSharedComponentsModule, NgbComponentsModule]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RequestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
