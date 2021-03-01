import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ApiService } from './api.service';
import { ServiceHostToken } from '../authentication/types';
import { AppHttpInterceptor } from '../_interceptors/http-interceptor';

@NgModule({
    imports: [CommonModule, HttpClientModule],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true },
        { provide: ServiceHostToken, useValue: 'api/' },
        ApiService],
})
export class ApiModule { }
