import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SystemManagementComponent } from './components/system-mng.component';

const routes: Routes = [
  {
    path: '',
    component: SystemManagementComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class SystemManagementRoutingModule { }
