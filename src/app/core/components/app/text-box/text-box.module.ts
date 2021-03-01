import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextBoxDirective } from './textbox.directive';
import { TextAreaDirective } from './textarea.directive';



@NgModule({
  declarations: [
    TextBoxDirective,
    TextAreaDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TextBoxDirective,
    TextAreaDirective
  ]
})
export class TextBoxModule { }
