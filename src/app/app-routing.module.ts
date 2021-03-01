import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { AppRouterModule } from '@app/core';
import { AppComponent } from './app.component';

const routes: Routes = [
    {
        path: '',
        component: AppComponent,
        children: [
            {
                path: 'login',
                loadChildren: () => import('./core/ui/pages/login-area/login-area.module')
                    .then(x => x.LoginAreaModule)
            },
            {
                path: 'pages',
                loadChildren: () => import('./pages/pages.module').then(x => x.PagesModule)
            }
        ]
    }
];
@NgModule({
    imports: [
        AppRouterModule.init(),
        AppRouterModule.forChild(routes)],
    exports: [AppRouterModule]
})
export class AppRoutingModule { }
