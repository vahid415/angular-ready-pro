import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from './card/card.module';
import { MenuModule } from './menu/menu.module';
import { LayoutModule } from './layout/layout.module';
import { ButtonModule } from './button/button.module';
import { TextBoxModule } from './text-box/text-box.module';
import { FormControlModule } from './form-control/form-control.module';
import { ButtonGroupModule } from './button-group/button-group.module';



@NgModule({
  imports: [
    CommonModule,
    MenuModule.forRoot()
  ],
  exports: [
    CardModule,
    LayoutModule,
    TextBoxModule,
    FormControlModule,
    ButtonModule,
    ButtonGroupModule,
    MenuModule
  ],
  declarations: []
})
export class AppSharedComponentsModule { }
