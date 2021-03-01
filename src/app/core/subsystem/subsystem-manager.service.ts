import { Injectable } from '@angular/core';

import {
    Subsystem, LOCALIZED_MENU_ITEM_TITLE_SYMBOL,
    SUBSYSTEM_FEATURE_ROUTES,
    SubsystemExternalRouteConfig,
    MenuItems,
} from './types';

@Injectable({
    providedIn: 'root'
})
export class SubsystemManager {
    // eslint-disable-next-line no-array-constructor
    readonly subsystems = new Array<Subsystem>();

    constructor(
    ) {
    }

    // register(subsystem: Subsystem, externalRoutes?: SubsystemExternalRouteConfig);
    // register(subsystem: Subsystem, usecasesRoutes?: NgRoutes);
    register(subsystem: Subsystem, routes?: SubsystemExternalRouteConfig) {
        this.validateSubsystem(subsystem);
        this.localizeSubsystem(subsystem);

        subsystem.featureRoutes = routes;
        this.subsystems.push(subsystem);

        // Register usecases routes
        if (Array.isArray(routes)) {
            routes.forEach(x => SUBSYSTEM_FEATURE_ROUTES.push(x));
        } else if (typeof routes === 'object') {
            routes.featureRoutes.forEach(x => SUBSYSTEM_FEATURE_ROUTES.push(x));
        }
    }

    private localizeSubsystem(ss: Subsystem) {
        const localizeMenuItems = (items: MenuItems) => {
            for (const item of items) {
                item[LOCALIZED_MENU_ITEM_TITLE_SYMBOL] = item.title;

                if (Array.isArray(item.children)) {
                    localizeMenuItems(item.children);
                }
            }
        };

        if (Array.isArray(ss.menuItems)) {
            localizeMenuItems(ss.menuItems);
        }
    }

    private validateSubsystem(ss: Subsystem) {
        // Do Validation here
    }
}
