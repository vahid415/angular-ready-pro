import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
    FormBuilder, FormControl,
    FormGroup, Validators
} from '@angular/forms';

import { SigningModel } from '../../../../authentication/types';
import { NavigationService } from '../../../../_services/navigation.service';
import { AuthenticationService } from '../../../../authentication/authentication.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    signingModel: SigningModel = {} as any;
    form: FormGroup;
    captcha: Blob = new Blob();
    loading = true;

    constructor(
        private authService: AuthenticationService,
        private httpClient: HttpClient,
        private fb: FormBuilder,
        private navService: NavigationService
        ) {
        this.form = fb.group({
            userName: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[^\u0600-\u06FF]+$')])),
            password: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[^\u0600-\u06FF]+$')])),
        });
        // TODO:
        // this.reloadCaptcha();
    }

    async onFormSubmit(): Promise<void> {
        try {
            this.loading = true;
            await this.authService.signIn(this.signingModel).toPromise();
            this.loading = false;
            await this.navService.goToDashboardPage();
        } catch {
            this.loading = false;
            // this.signingModel.captcha = '';
            // this.signingModel.password = '';
            this.reloadCaptcha();
        }
    }

    reloadCaptcha(): void {
        this.authService.getCaptcha().subscribe(x => {
            this.captcha = x;
        });
    }
}
