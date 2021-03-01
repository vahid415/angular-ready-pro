import {
    AfterViewInit,
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    HostBinding,
    OnDestroy,
    Renderer2,
} from '@angular/core';

@Directive({
    selector: '[appTextBox]',
    providers: []
})
export class TextBoxDirective implements AfterViewInit, OnDestroy {
    @HostBinding('class.r-textbox')
    public hostClass = true;

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

    /**
     * @hidden
     */
    @Input()
    public set value(text: string) {
        if (!this.inputElement) { return; }
        this.inputElement.nativeElement.value = (text === undefined || text === null) ? '' : text;
        this.onValueChange.emit();
    }

    /**
     * @hidden
     */
    public get value(): string {
        return this.inputElement.nativeElement.value;
    }

    public get id(): string {
        return this.inputElement.nativeElement.id;
    }
    public set id(id: string) {
        this.renderer.setAttribute(this.inputElement.nativeElement, 'id', id);
    }

    private listeners: any[] = [];

    // eslint-disable-next-line no-useless-constructor
    constructor(
        private renderer: Renderer2,
        private inputElement: ElementRef
        // eslint-disable-next-line no-empty-function
    ) { }

    public ngAfterViewInit(): void {
        const input = this.inputElement.nativeElement;
        this.listeners = [
            this.renderer.listen(input, 'focus', () => this.onFocus.emit()),
            this.renderer.listen(input, 'blur', () => this.onBlur.emit())
        ];
    }

    public ngOnDestroy(): void {
        this.listeners.forEach(listener => listener());
    }
}
