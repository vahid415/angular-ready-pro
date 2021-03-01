import { Directive } from '@angular/core';

@Directive({
  selector: '[appContent]',
  exportAs: 'content',
})
export class CardContentDirective {


}
