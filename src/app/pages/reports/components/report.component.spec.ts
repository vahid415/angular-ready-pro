import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppSharedComponentsModule, NgbComponentsModule } from '@app/core';

import { ReportComponent } from './report.component';

describe('ReportComponent', () => {
    let component: ReportComponent;
    let fixture: ComponentFixture<ReportComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ReportComponent],
            imports: [AppSharedComponentsModule, NgbComponentsModule]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ReportComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
