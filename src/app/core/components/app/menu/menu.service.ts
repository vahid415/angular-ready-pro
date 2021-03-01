import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import {
    Observable, BehaviorSubject, ReplaySubject,
    Subject
} from 'rxjs';
import { share } from 'rxjs/operators';
import {
    isUrlPathContain, isUrlPathEqual
} from './url-matching-helpers';
import { MenuItem } from './menu-item';

export interface MenuBag { tag: string; item: MenuItem }

const itemClick$ = new Subject<MenuBag>();
const addItems$ = new ReplaySubject<{ tag: string; items: MenuItem[] }>(1);
const navigateHome$ = new ReplaySubject<{ tag: string }>(1);
const getSelectedItem$ = new ReplaySubject<{ tag: string; listener: BehaviorSubject<MenuBag> }>(1);
const itemSelect$ = new ReplaySubject<MenuBag>(1);
const itemHover$ = new ReplaySubject<MenuBag>(1);
const submenuToggle$ = new ReplaySubject<MenuBag>(1);
const collapseAll$ = new ReplaySubject<{ tag: string }>(1);


@Injectable()
export class MenuService {
    addItems(items: MenuItem[], tag?: string) {
        addItems$.next({ tag, items });
    }

    collapseAll(tag?: string) {
        collapseAll$.next({ tag });
    }

    navigateHome(tag?: string) {
        navigateHome$.next({ tag });
    }

    getSelectedItem(tag?: string): Observable<MenuBag> {
        const listener = new BehaviorSubject<MenuBag>(null);

        getSelectedItem$.next({ tag, listener });

        return listener.asObservable();
    }

    onItemClick(): Observable<MenuBag> {
        return itemClick$.pipe(share());
    }

    onItemSelect(): Observable<MenuBag> {
        return itemSelect$.pipe(share());
    }

    onItemHover(): Observable<MenuBag> {
        return itemHover$.pipe(share());
    }

    onSubmenuToggle(): Observable<MenuBag> {
        return submenuToggle$.pipe(share());
    }
}

@Injectable()
export class MenuInternalService {
    constructor(private location: Location) { }

    prepareItems(items: MenuItem[]) {
        const defaultItem = new MenuItem();
        items.forEach(i => {
            this.applyDefaults(i, defaultItem);
            this.setParent(i);
        });
    }

    selectFromUrl(items: MenuItem[], tag: string, collapseOther: boolean = false) {
        const selectedItem = this.findItemByUrl(items);
        if (selectedItem) {
            this.selectItem(selectedItem, items, collapseOther, tag);
        }
    }

    selectItem(item: MenuItem, items: MenuItem[], collapseOther: boolean = false, tag: string) {
        const unselectedItems = this.resetSelection(items);
        const collapsedItems = collapseOther ? this.collapseItems(items) : [];

        for (const parent of MenuItem.getParents(item)) {
            parent.selected = true;
            if (!unselectedItems.includes(parent)) {
                this.itemSelect(parent, tag);
            }

            const wasNotExpanded = !parent.expanded;
            parent.expanded = true;
            const i = collapsedItems.indexOf(parent);
            if (i === -1 && wasNotExpanded) {
                this.submenuToggle(parent, tag);
            } else {
                collapsedItems.splice(i, 1);
            }
        }

        item.selected = true;
        if (!unselectedItems.includes(item)) {
            this.itemSelect(item, tag);
        }

        for (const collapsedItem of collapsedItems) {
            this.submenuToggle(collapsedItem, tag);
        }
    }

    collapseAll(items: MenuItem[], tag: string, except?: MenuItem) {
        const collapsedItems = this.collapseItems(items, except);

        for (const item of collapsedItems) {
            this.submenuToggle(item, tag);
        }
    }

    onAddItem(): Observable<{ tag: string; items: MenuItem[] }> {
        return addItems$.pipe(share());
    }

    onNavigateHome(): Observable<{ tag: string }> {
        return navigateHome$.pipe(share());
    }

    onCollapseAll(): Observable<{ tag: string }> {
        return collapseAll$.pipe(share());
    }

    onGetSelectedItem(): Observable<{ tag: string; listener: BehaviorSubject<MenuBag> }> {
        return getSelectedItem$.pipe(share());
    }

    itemHover(item: MenuItem, tag?: string) {
        itemHover$.next({ tag, item });
    }

    submenuToggle(item: MenuItem, tag?: string) {
        submenuToggle$.next({ tag, item });
    }

    itemSelect(item: MenuItem, tag?: string) {
        itemSelect$.next({ tag, item });
    }

    itemClick(item: MenuItem, tag?: string) {
        itemClick$.next({ tag, item });
    }

    private resetSelection(items: MenuItem[]): MenuItem[] {
        const unselectedItems = [];
        for (const item of items) {
            if (item.selected) {
                unselectedItems.push(item);
            }
            item.selected = false;

            if (item.children) {
                unselectedItems.push(...this.resetSelection(item.children));
            }
        }
        return unselectedItems;
    }

    private collapseItems(items: MenuItem[], except?: MenuItem): MenuItem[] {
        const collapsedItems = [];
        for (const item of items) {
            if (except && (item === except || MenuItem.isParent(item, except))) {
                // eslint-disable-next-line no-continue
                continue;
            }
            if (item.expanded) {
                collapsedItems.push(item);
            }
            item.expanded = false;

            if (item.children) {
                collapsedItems.push(...this.collapseItems(item.children));
            }
        }
        return collapsedItems;
    }

    private applyDefaults(item, defaultItem) {
        const menuItem = { ...item };
        Object.assign(item, defaultItem, menuItem);
        item.children && item.children.forEach(child => {
            this.applyDefaults(child, defaultItem);
        });
    }

    private setParent(item: MenuItem) {
        item.children && item.children.forEach(child => {
            child.parent = item;
            this.setParent(child);
        });
    }

    private findItemByUrl(items: MenuItem[]): MenuItem | undefined {
        let selectedItem;
        items.some(item => {
            if (item.children) {
                selectedItem = this.findItemByUrl(item.children);
            }
            if (!selectedItem && this.isSelectedInUrl(item)) {
                selectedItem = item;
            }
            return selectedItem;
        });
        return selectedItem;
    }

    private isSelectedInUrl(item: MenuItem): boolean {
        const exact: boolean = item.pathMatch === 'full';
        const path: string = item.path;
        const isSelectedInPath = exact
            ? isUrlPathEqual(this.location.path(), path)
            : isUrlPathContain(this.location.path(), path);

        return isSelectedInPath;
    }
}
