import {
    Component,
    Input,
    ContentChild,
    ChangeDetectorRef,
    AfterContentChecked,
    HostBinding,
} from '@angular/core';
import { AbstractControl, NgControl, ValidationErrors } from '@angular/forms';
import { ErrorMessageType } from '../../../_models/error-message';

@Component({
    selector: 'app-form-control',
    templateUrl: './form-control.component.html',
    styleUrls: ['./form-control.component.scss'],
})

export class FormControlComponent implements AfterContentChecked {
    @Input() label: string;
    @Input() hint: string;
    @Input() errorMessage: ErrorMessageType = new ErrorMessageType();
    @Input() showMessages = true;
    @Input() showValidationErrors = true;
    @HostBinding('class') class = 'app-form-control';
    @ContentChild(NgControl, { static: true }) private ngCtrl: NgControl;

    // eslint-disable-next-line no-useless-constructor
    constructor(
        private cdr: ChangeDetectorRef,
        // eslint-disable-next-line no-empty-function
    ) {
    }

    get _labelText(): string | undefined {
        let label: string | undefined;
        if (typeof this.label === 'string') {
            label = this.label;
        }
        return label;
    }

    get _hintText(): string | undefined {
        let hint: string | undefined;
        if (typeof this.hint === 'string') {
            hint = this.hint;
        }
        return hint;
    }

    get errorText(): string | undefined {
        let error: string | undefined;
        if (this.ngCtrl && this.ngCtrl.errors && this.ngCtrl.touched) {
            error = this.localizeError(this.ngCtrl.errors);
        }
        if (this.ngCtrl && this.ngCtrl?.control?.value) {
            this.ngCtrl.control.markAsTouched();
        }
        return error;
    }

    get required(): boolean {
        if (this.ngCtrl.control?.validator) {
            const validator = this.ngCtrl.control?.validator({} as AbstractControl);
            if (validator && validator.required) {
                return true;
            }
        }
        return false;
    }

    localizeError(err: ValidationErrors): string {
        let text: string;
        if (err.required) {
            this.errorMessage.required ? text = this.errorMessage.required : text = 'required';
        } else if (err.pattern) {
            this.errorMessage.pattern ? text = this.errorMessage.pattern
                : text = 'validation-err-invalid-pattern';
        } else if (err.min) {
            this.errorMessage.min ? text = this.errorMessage.min
                : text = 'validation-err-min'.replace('{0}', err.min.requiredMin);
        } else if (err.max) {
            this.errorMessage.max ? text = this.errorMessage.max
                : text = 'validation-err-max'.replace('{0}', err.max.requiredMax);
        } else if (err.minlength) {
            this.errorMessage.minLength ? text = this.errorMessage.minLength
                : text = 'validation-err-minLength'.replace('{0}', err.minlength.requiredLength);
        } else if (err.maxlength) {
            this.errorMessage.maxLength ? text = this.errorMessage.maxLength
                : text = 'validation-err-maxLength'.replace('{0}', err.maxlength.requiredLength);
        } else if (err.email) {
            this.errorMessage.email ? text = this.errorMessage.email : text = 'validation-err-email';
        } else if (err.nationalCodeValidator) {
            this.errorMessage.nationalCodeValidator ? text = this.errorMessage.nationalCodeValidator
                : text = 'validation-err-invalid-national-code';
        } else if (err.equalWith) {
            this.errorMessage.equalWith ? text = this.errorMessage.equalWith : text = err.equalWith.message;
        } else if (err.customValidation) {
            text = err.customValidation.message ? err.customValidation.message : 'validation-err-unknown';
        } else {
            this.errorMessage.customErrorMsg ? text = this.errorMessage.customErrorMsg
                : text = 'validation-err-unknown';
        }
        return text;
    }

    ngAfterContentChecked(): void {
        this.cdr.detectChanges();
    }
}
