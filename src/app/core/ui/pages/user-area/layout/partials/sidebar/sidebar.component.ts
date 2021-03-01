import { Component } from '@angular/core';
import { MenuItems } from '../../../../../../components/app/menu/menu-item';
import { SubsystemManager } from '../../../../../../subsystem/subsystem-manager.service';


@Component({
    selector: 'app-user-area-sidebar',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class UserAreaSidebarComponent {
    menuList: MenuItems;

    constructor(private subsystemManager: SubsystemManager) {
        let menuItems: MenuItems = [];
        subsystemManager.subsystems
            .filter(ss => Array.isArray(ss.menuItems))
            .forEach(ss => menuItems = menuItems.concat(ss.menuItems));
        this.menuList = menuItems;
    }
}
