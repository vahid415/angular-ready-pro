import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LoginLayoutComponent } from './layout/login-layout.component';
import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AuthorizationGuard } from '../../../_guards/authorization-guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SignUpComponent } from './sign-up/sign-up.component';


const routes: Routes = [
  {
    path: '',
    component: LoginLayoutComponent,
    canActivate: [AuthorizationGuard],
    children: [
      {
        path: '',
        component: LoginComponent,
        data: {
          pageKey: 'login'
        }

      },
      {
        path: 'sign-up',
        component: SignUpComponent,
        data: {
          pageKey: 'sign-up'
        }
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
        data: {
          pageKey: 'change-password'
        }
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        data: {
          pageKey: 'forgot-password'
        }
      },

    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class LoginAreaRoutingModule {
}
