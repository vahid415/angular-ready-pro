import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {
    HttpEvent,
    HttpRequest,
    HttpHandler,
    HttpResponse,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { catchError, finalize, map } from 'rxjs/operators';

import { TemporaryHttpHeaderKeys, ResponseCodes } from './types';
import { NavigationService } from '../_services/navigation.service';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
    // eslint-disable-next-line no-useless-constructor
    constructor(
        private authService: AuthenticationService,
        private navService: NavigationService,
    // eslint-disable-next-line no-empty-function
    ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let { headers } = request;
        const { body } = request;
        const emptyContent = body === undefined || body === null;
        const displayServerErrorsHeader = request.headers.get(TemporaryHttpHeaderKeys.DisplayServerErrors);
        const afterUnauthorizedErrorHeader = request.headers.get(TemporaryHttpHeaderKeys.AfterUnauthorizedError);
        const displayServerErrors = (displayServerErrorsHeader !== 'False');
        const goToLoginPageAfterUnauthorizedError = (afterUnauthorizedErrorHeader !== 'Nothing');

        if (emptyContent) {
            headers = request.headers.set('Content-Type', 'application/json');
        }

        headers = request.headers.delete(TemporaryHttpHeaderKeys.DisplayServerErrors);
        headers = request.headers.delete(TemporaryHttpHeaderKeys.AfterUnauthorizedError);
        // eslint-disable-next-line no-param-reassign
        request = request.clone({ headers });
        // TODO: console.log('start loading');
        return next.handle(request)
            .pipe(
                map((event: any) => {
                    if (event instanceof HttpResponse) {
                        const responseBody = event.body;
                        if (responseBody && typeof responseBody.code === 'number') {
                            if (responseBody.code === ResponseCodes.OK) {
                                return event.clone({ body: responseBody.response });
                            }

                            if (responseBody.code === ResponseCodes.Unauthorized) {
                                this.authService.clearUser();
                                if (goToLoginPageAfterUnauthorizedError) {
                                    this.navService.goToSignInPage();
                                }
                            }

                            throw responseBody.response;
                        }
                        // TODO:  console.log('stop loading');
                    }

                    return event;
                }),
                catchError((error: HttpErrorResponse) => {
                    if (error && displayServerErrors) {
                        // TODO: console.log(error.message);
                    }
                    // TODO:  console.log('stop loading');
                    return throwError(error);
                }),
                finalize(() => {
                    // TODO:  console.log('stop loading');
                })
            );
    }
}
