import {
    Directive,
    ElementRef,
    EventEmitter,
    HostBinding,
    OnDestroy,
    Renderer2,
    Optional,
    Inject,
    Input,
    OnChanges,
    OnInit,
    NgZone,
    forwardRef,
    Output,
    ChangeDetectorRef,
    Injector
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';


import { Subscription, fromEvent } from 'rxjs';
import {
    hasObservers, requiresZoneOnBlur,
    AppInput, RTL
} from './utils';

@Directive({
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        // eslint-disable-next-line no-use-before-define
        useExisting: forwardRef(() => TextAreaDirective),
        multi: true
    }, {
        provide: AppInput,
        // eslint-disable-next-line no-use-before-define
        useExisting: forwardRef(() => TextAreaDirective)
    }],
    selector: '[appTextArea]'
})
export class TextAreaDirective implements OnInit, OnDestroy, OnChanges, ControlValueAccessor {
    @HostBinding('class.r-textarea')
    public get elementClass(): boolean {
        return true;
    }

    @HostBinding('attr.dir')
    public direction: string;

    /**
     * Fires each time the textarea value is changed.
     */
    @Output()
    public valueChange: EventEmitter<any> = new EventEmitter();


    @Input()
    public autoSize = false;

    /**
     * Specifies the textarea value.
     */
    @Input()
    public value: string;

    /**
     * @hidden
     */
    public onFocus: EventEmitter<any> = new EventEmitter();

    /**
     * @hidden
     */
    public onBlur: EventEmitter<any> = new EventEmitter();

    /**
     * @hidden
     */
    public onValueChange: EventEmitter<any> = new EventEmitter();

    public get id(): string {
        return this.element.nativeElement.id;
    }

    public set id(id: string) {
        this.renderer.setAttribute(this.element.nativeElement, 'id', id);
    }

    private listeners: any[] = [];
    private inputSubscription: Subscription;
    private initialHeight: number;
    private control: any;

    constructor(
        private renderer: Renderer2,
        private element: ElementRef,
        private zone: NgZone,
        private changeDetector: ChangeDetectorRef,
        private injector: Injector,
        @Optional() @Inject(RTL) rtl: boolean
    ) {
        this.direction = !rtl ? 'rtl' : 'ltr';
    }
    /**
     * @hidden
     */
    public writeValue(value: any): void {
        this._elementValue = value;

        this._resize();
    }
    /**
     * @hidden
     */
    public registerOnChange(fn: () => any): void {
        this.ngChange = fn;
    }

    /**
     * @hidden
     */
    public registerOnTouched(fn: () => any): void {
        this.ngTouched = fn;
    }

    /**
     * @hidden
     */
    public setDisabledState(isDisabled: boolean): void {
        this._setElementProperty('disabled', isDisabled);
    }

    public ngOnChanges(changes: any): void {
        const element = this.element.nativeElement;

        if (changes.value) {
            this._elementValue = this.value;
        }

        if (changes.autoSize) {
            if (this.autoSize) {
                this.initialHeight = element.offsetHeight;

                this.renderer.setStyle(element, 'resize', 'none');
            } else {
                this.renderer.setStyle(element, 'overflow-y', 'auto');
                this.renderer.setStyle(element, 'resize', 'both');

                element.style.height = `${this.initialHeight}px`;
            }
        }

        this._resize();
    }

    public ngOnInit(): void {
        const element = this.element.nativeElement;

        this.zone.runOutsideAngular(() => {
            this.listeners = [
                this.renderer.listen(element, 'focus', this._handleFocus.bind(this)),
                this.renderer.listen(element, 'blur', this._handleBlur.bind(this))
            ];

            this.inputSubscription = fromEvent(element, 'input')
                .subscribe(this._handleInput.bind(this));
        });

        this.control = this.injector.get<NgControl>(NgControl as any, undefined);
    }

    public ngOnDestroy(): void {
        this.listeners.forEach(listener => listener());

        if (this.inputSubscription) {
            this.inputSubscription.unsubscribe();
        }
    }

    private ngChange: any = (_: number): void => { /* lint metadata */ };
    private ngTouched: any = (): void => { /* lint metadata */ };



    private get elementValue(): any {
        if (this.element) {
            return this.element.nativeElement.value;
        }
        return undefined;
    }

    private set _elementValue(value: any) {
        this._setElementProperty('value', (value === undefined || value === null) ? undefined : value);
    }


    private _setElementProperty(name: string, value: any): void {
        if (this.element) {
            this.renderer.setProperty(this.element.nativeElement, name, value);
        }
    }

    private _resize(): void {
        if (!this.autoSize) {
            return;
        }

        const element = this.element.nativeElement;
        this.renderer.setStyle(element, 'overflow-y', 'hidden');

        element.style.height = `${this.initialHeight}px`;

        const { scrollHeight } = element.scrollHeight;
        if (scrollHeight > this.initialHeight) {
            element.style.height = `${scrollHeight}px`;
        }
    }

    private _handleInput(): void {
        const value = this.elementValue;
        this.value = value;

        if (this.control || hasObservers(this.onValueChange) || hasObservers(this.valueChange)) {
            this.zone.run(() => {
                this.ngChange(value);
                this.onValueChange.emit(value);
                this.valueChange.emit(value);

                this.changeDetector.markForCheck();
            });
        }

        this._resize();
    }

    private _handleFocus(): void {
        if (hasObservers(this.onFocus)) {
            this.zone.run(() => {
                this.onFocus.emit();
            });
        }
    }

    private _handleBlur(): void {
        if (hasObservers(this.onBlur) || requiresZoneOnBlur(this.control)) {
            this.zone.run(() => {
                this.ngTouched();
                this.onBlur.emit();
                this.changeDetector.markForCheck();
            });
        }
    }
}
