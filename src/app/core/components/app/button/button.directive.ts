import {
  Input, ElementRef, Renderer2,
  Directive, HostBinding, OnInit
} from '@angular/core';

@Directive({
  selector: '[appButton]',
  exportAs: 'appButton',
})
export class ButtonDirective implements OnInit {
  @Input() size: 'small' | 'default' | 'large' = 'default';
  @Input() color:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark' = 'primary';

  @HostBinding('class.btn-sm') small: boolean = false;
  @HostBinding('class.btn-lg') large: boolean = false;
  @HostBinding('class') get btnColor(): string {
    return `${'btn-'}${this.color}`;
  }

  constructor(private el: ElementRef, private render: Renderer2) {
    render.addClass(el.nativeElement, 'btn-app');
    render.addClass(el.nativeElement, 'btn');
  }
  ngOnInit(): void {
    switch (this.size) {
      case 'small':
        this.small = true;
        break;
      case 'large':
        this.large = true;
        break;
      default:
        this.small = true;
    }
  }
}
