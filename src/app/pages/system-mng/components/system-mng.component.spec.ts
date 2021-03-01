import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppSharedComponentsModule, NgbComponentsModule } from '@app/core';

import { SystemManagementComponent } from './system-mng.component';

describe('SystemManagementComponent', () => {
    let component: SystemManagementComponent;
    let fixture: ComponentFixture<SystemManagementComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SystemManagementComponent],
            imports: [AppSharedComponentsModule, NgbComponentsModule]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SystemManagementComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
