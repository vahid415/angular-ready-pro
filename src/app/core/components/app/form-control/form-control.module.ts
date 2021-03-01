import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FormControlComponent } from './form-control.component';

@NgModule({
    declarations: [
        FormControlComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    exports: [
        FormControlComponent,
    ]
})
export class FormControlModule { }
