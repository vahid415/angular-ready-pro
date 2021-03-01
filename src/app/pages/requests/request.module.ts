import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSharedComponentsModule } from '@app/core';
import { RequestComponent } from './components/request.component';
import { RequestRoutingModule } from './request-routing.module';



@NgModule({
  declarations: [RequestComponent],
  imports: [
    RequestRoutingModule,
    CommonModule,
    AppSharedComponentsModule
  ]
})
export class RequestModule { }
