import { NgModule } from '@angular/core';
import { AppRouterModule, AppRoutes } from '@app/core';
import { CustomerComponent } from './components/customer.component';
import { CustomerInfoComponent } from './components/customer-info/customer-info.component';

const routes: AppRoutes = [
    {
        path: '',
        component: CustomerComponent,
        children: [{
            path: 'info',
            component: CustomerInfoComponent
        }]
    }
];

@NgModule({
    imports: [
        AppRouterModule.forChild(routes),
    ]
})
export class CustomerRoutingModule { }
