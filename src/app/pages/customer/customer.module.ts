import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { AppRouterModule, AppSharedComponentsModule } from '@app/core';

import { CustomerService } from './services/customer.service';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './components/customer.component';
import { CustomerInfoComponent } from './components/customer-info/customer-info.component';

@NgModule({
  declarations: [CustomerComponent, CustomerInfoComponent],
  imports: [
    CustomerRoutingModule,
    SharedModule,
    AppRouterModule,
    AppSharedComponentsModule
  ],
  providers: [CustomerService]
})
export class CustomerModule { }
