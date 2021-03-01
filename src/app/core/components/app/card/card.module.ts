import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { CardFooterDirective } from './card-footer.directive';
import { CardContentDirective } from './card-content.directive';

@NgModule({
  declarations: [
    CardComponent,
    CardFooterDirective,
    CardContentDirective
  ],
  exports: [
    CardComponent,
    CardFooterDirective,
    CardContentDirective
  ],
  imports: [
    CommonModule,
  ]
})

export class CardModule { }
