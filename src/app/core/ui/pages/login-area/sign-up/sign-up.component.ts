import { Component } from '@angular/core';
import {
    FormBuilder, FormControl,
    FormGroup, Validators
} from '@angular/forms';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
    form: FormGroup

    constructor(private fb: FormBuilder) {
        this.form = fb.group({
            userName: new FormControl('', Validators.compose([Validators.required])),
            email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
            password: new FormControl('', Validators.compose([Validators.required])),
            confirmPassword: new FormControl('', Validators.compose([Validators.required])),
        });
    }
    onFormSubmit(): void { }
}
