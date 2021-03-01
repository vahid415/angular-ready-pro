import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';
import { EnvironmentDescriptor } from '../authentication/environment';
import { MenuItem } from '../components/app/menu/menu-item';

export const LOCALIZED_MENU_ITEM_TITLE_SYMBOL = Symbol('LOCALIZED_MENU_ITEM_TITLE');
export const SUBSYSTEM_FEATURE_ROUTES = [];
export interface SubsystemExternalRouteConfig {
    featureRoutes: Routes;
}

@Injectable()
export class Subsystem {
    id: string;
    titleKey?: string;
    icon?: string;
    environment: EnvironmentDescriptor;
    faIcon?: string; /** Fontawesome Icon name. */
    menuItems?: MenuItem[];
    featureRoutes?: SubsystemExternalRouteConfig;
}

export type MenuItems = MenuItem[];
