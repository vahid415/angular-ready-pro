import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UserAreaFooterComponent } from './partials/footer/footer.component';
import { UserAreaHeaderComponent } from './partials/header/header.component';
import { UserAreaSidebarComponent } from './partials/sidebar/sidebar.component';
import { UserAreaBreadcrumbComponent } from './partials/bread-crumb/breadcrumb.component';
import { UserAreaLayoutComponent } from './user-area-layout.component';
import { NgbComponentsModule } from '../../../../components/ng-bootstrap/ngb-component.module';
import { MenuModule } from '../../../../components/app/menu/menu.module';




@NgModule({
    declarations: [
        UserAreaLayoutComponent,
        UserAreaHeaderComponent,
        UserAreaFooterComponent,
        UserAreaSidebarComponent,
        UserAreaBreadcrumbComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        MenuModule.forRoot(),
        NgbComponentsModule
    ],
    exports: [
        UserAreaLayoutComponent,
        UserAreaHeaderComponent,
        UserAreaSidebarComponent,
        UserAreaFooterComponent,
        UserAreaBreadcrumbComponent
    ],
    providers: []
})
export class UserAreaLayoutModule { }
