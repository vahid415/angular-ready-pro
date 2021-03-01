import { Component, Renderer2, OnInit } from '@angular/core';
import { environment } from '@app/env/environment';
import { LayoutDirectionService, SideBarStates } from '../../../../_services/direction.service';

@Component({
    selector: 'app-user-area-layout',
    templateUrl: './user-area-layout.component.html',
    styleUrls: ['./user-area-layout.component.scss'],
})
export class UserAreaLayoutComponent {
    sidebarState: SideBarStates;
    constructor(private layoutService: LayoutDirectionService,
        private renderer: Renderer2) {
        // eslint-disable-next-line no-return-assign
        this.sidebarState = this.layoutService.toggleState;
        this.layoutService.sideBarToggle.subscribe((sidebarState: SideBarStates) => {
            this.sidebarState = sidebarState;
        });
        this.renderer.addClass(document.body, (layoutService.isLtr() ? 'ltr' : 'rtl')); // it will add 'rtl' class to body
    }

    getSidebarDirection() {
        return this.layoutService.isRtl()
            ? 'sidebar-rtl'
            : 'sidebar-ltr';
    }
    getMainDirection() {
        return this.layoutService.isRtl()
            ? 'main-rtl'
            : 'main-ltr';
    }
}

