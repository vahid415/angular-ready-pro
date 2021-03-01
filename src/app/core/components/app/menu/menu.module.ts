import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { MenuComponent } from './menu.component';
import { MenuItemComponent } from './menu-item.component';
import { MenuInternalService, MenuService } from './menu.service';

const MENU_COMPONENT = [MenuComponent, MenuItemComponent];

const MENU_PROVIDERS = [MenuService, MenuInternalService];
@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgbTooltipModule
    ],
    declarations: [...MENU_COMPONENT],
    exports: [...MENU_COMPONENT],
})
export class MenuModule {
    static forRoot(): ModuleWithProviders<MenuModule> {
        return {
            ngModule: MenuModule,
            providers: [
                ...MENU_PROVIDERS,
            ],
        };
    }
}
