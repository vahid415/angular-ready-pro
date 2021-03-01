import { Params, QueryParamsHandling } from '@angular/router';

export class MenuItem {
    /**
     * Item Title
     * @type {string}
    */
    title: string;
    /**
     * Item relative link (for routerLink)
     * @type {string}
     */
    path?: string;
    /**
     * Item URL (absolute)
     * @type {string}
     */
    url?: string;
    /**
     * Icon class name or icon config object
     * @type {string}
     */
    icon?: string;
    /**
     * Expanded by default
     * @type {boolean}
     */
    expanded?: boolean;
    /**
     * Children items
     * @type {List<MenuItem>}
     */
    children?: MenuItem[];
    /**
     * HTML Link target
     * @type {string}
     */
    target?: string;
    /**
     * Hidden Item
     * @type {boolean}
     */
    hidden?: boolean;
    /**
     * Where this is a home item
     * @type {boolean}
     */
    home?: boolean;
    /**
     * Item is selected when partly or fully equal to the current url
     * @type {string}
     */

    pathMatch?: 'full' | 'prefix';
    /**
     * Whether the item is just a group (non-clickable)
     * @type {boolean}
     */
    group?: boolean;
    /**
     * Parent Item
     * @type {MenuItem}
     */
    parent?: MenuItem;
    /**
     * Selected Item
     * @type {boolean}
     */
    selected?: boolean;
    /**
    * Menu Data Item
    * @type {any}
    */
    data?: any;
    /**
    *  for Backward Compatibility
    * @type {number}
    */
    id?: number;
    permission?: string | string[];
    queryParams?: Params;
    fragment?: string;
    queryParamsHandling?: QueryParamsHandling;
    preserveFragment?: boolean;
    static getParents(item: MenuItem): MenuItem[] {
        const parents = [];

        let parent = item.parent;
        while (parent) {
            parents.unshift(parent);
            parent = parent.parent;
        }

        return parents;
    }

    static isParent(item: MenuItem, possibleChild: MenuItem): boolean {
        return possibleChild.parent
            ? possibleChild.parent === item || this.isParent(item, possibleChild.parent)
            : false;
    }
    constructor() {
        // this.pathMatch = 'full';
    }
}

export type MenuItems = MenuItem[];

