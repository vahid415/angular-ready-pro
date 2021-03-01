import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoreModule } from '@app/core';

import { UserAreaFooterComponent } from './footer.component';

describe('UserAreaFooterComponent', () => {
    let component: UserAreaFooterComponent;
    let fixture: ComponentFixture<UserAreaFooterComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, CoreModule.forRoot()],
            declarations: [UserAreaFooterComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UserAreaFooterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
