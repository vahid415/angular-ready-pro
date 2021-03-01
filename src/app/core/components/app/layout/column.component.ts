import {
    Component, Input, OnChanges, SimpleChanges,
    ElementRef, Renderer2
} from '@angular/core';

@Component({
    selector: 'app-column',
    template: '<ng-content></ng-content>',
})

export class ColumnComponent implements OnChanges {
    @Input() xs = '';
    @Input() sm = '';
    @Input() md = '';
    @Input() lg = '';
    @Input() xl = '';

    // eslint-disable-next-line no-empty-function
    constructor(private render: Renderer2, private el: ElementRef) { }

    ngOnChanges(changes: SimpleChanges): void {
        const e = this.el.nativeElement;
        ['xs', 'sm', 'md', 'lg', 'xl'].forEach(device => {
            if (changes[device]) {
                const pre = changes[device].previousValue;
                const cur = changes[device].currentValue;
                if (pre) {
                    this.render.removeClass(e, `col${device === 'xs' ? '' : `-${device}`}-${pre}`);
                }
                if (cur) {
                    this.render.addClass(e, `col-${device}-${cur}`);
                }
            }
        });
    }
}
