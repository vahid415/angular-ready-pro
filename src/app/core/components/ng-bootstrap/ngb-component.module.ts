import { NgModule } from '@angular/core';

import { NgbDropdownModule, NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  exports: [
    NgbModule,
    NgbTooltipModule,
    NgbDropdownModule,
  ],
  declarations: []
})
export class NgbComponentsModule { }
