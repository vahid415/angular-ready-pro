import { LoadChildren } from '@angular/router';
import { Type } from '@angular/core';

// eslint-disable-next-line no-use-before-define
export declare type AppRoutes = AppRoute[];

export interface AppRouteData {
    permission?: string | string[];
}

export interface AppRoute {
    path?: string;
    component?: Type<any>;
    children?: AppRoutes;
    loadChildren?: LoadChildren;
    data?: AppRouteData;
    redirectTo?: string;
}
