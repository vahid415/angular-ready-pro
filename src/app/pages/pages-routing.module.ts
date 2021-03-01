import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationGuard } from '@app/core';
import { PagesComponent } from './pages.component';

export const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [AuthorizationGuard],
    canActivateChild: [AuthorizationGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(x => x.DashboardModule)
      },
      {
        path: 'customers',
        loadChildren: () => import('./customer/customer.module').then(x => x.CustomerModule)
      },
      {
        path: 'requests',
        loadChildren: () => import('./requests/request.module').then(x => x.RequestModule)
      },
      {
        path: 'reports',
        loadChildren: () => import('./reports/report.module').then(x => x.ReportModule)
      },
      {
        path: 'system-mng',
        loadChildren: () => import('./system-mng/system-mng.module').then(x => x.SystemManagementModule)
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class PagesRoutingModule {

}
