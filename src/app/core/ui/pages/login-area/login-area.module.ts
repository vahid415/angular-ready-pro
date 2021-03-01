import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginAreaRoutingModule } from './login-area-routing.module';
import { LoginLayoutComponent } from './layout/login-layout.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AppSharedComponentsModule } from '../../../components/app/app-shared-components.module';



@NgModule({
    declarations: [
        LoginLayoutComponent,
        LoginComponent,
        ChangePasswordComponent,
        ForgotPasswordComponent,
        SignUpComponent,
    ],
    imports: [
        LoginAreaRoutingModule,
        CommonModule,
        AppSharedComponentsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule,
    ],
    providers: [
    ]
})
export class LoginAreaModule {
}
