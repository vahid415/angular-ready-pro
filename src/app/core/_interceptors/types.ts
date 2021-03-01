export interface HttpOptions {
    query?: any;
    pathType?: 'relative' | 'absolute';
    responseType?: 'json' | 'blob';
    contentType?: 'json' | 'multipart/form-data';
    displayServerErrors?: boolean;
    goToLoginPageAfterUnauthorizedError?: boolean;
}
// eslint-disable-next-line no-shadow
export enum ResponseCodes {
    OK = 0,
    Unauthorized = 401
}

// eslint-disable-next-line no-shadow
export enum TemporaryHttpHeaderKeys {
    DisplayServerErrors = 'Display-Server-Errors',
    AfterUnauthorizedError = 'After-Unauthorized-Error',
}

