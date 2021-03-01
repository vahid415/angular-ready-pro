import {
    Component,
    Input,
    OnInit,
    OnDestroy,
    AfterViewInit,
    Inject,
    PLATFORM_ID,
    InjectionToken,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd, NavigationExtras } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { MenuItem } from './menu-item';
import { MenuInternalService, MenuBag } from './menu.service';

export const APP_WINDOW = new InjectionToken<Window>('Window');
export type NullableInput = string | null | undefined;
export type BooleanInput = boolean | NullableInput;

export function convertToBoolProperty(val: any): boolean {
    if (typeof val === 'string') {
        val = val.toLowerCase().trim();

        return (val === 'true' || val === '');
    }

    return !!val;
}

@Component({
    selector: 'app-menu',
    styleUrls: ['./menu.component.scss'],
    template: `
    <ul class="menu-items">
      <ng-container *ngFor="let item of items">
        <li MenuItem *ngIf="!item.hidden"
            [menuItem]="item"
            [class.menu-group]="item.group"
            (hoverItem)="onHoverItem($event)"
            (toggleSubMenu)="onToggleSubMenu($event)"
            (selectItem)="onSelectItem($event)"
            (itemClick)="onItemClick($event)"
            class="menu-item">
        </li>
      </ng-container>
    </ul>
  `,
})
export class MenuComponent implements OnInit, AfterViewInit, OnDestroy {
    private _autoCollapse = false;
    @Input() tag: string;

    @Input() items: MenuItem[];

    @Input()
    get autoCollapse(): boolean {
        return this._autoCollapse;
    }
    set autoCollapse(value: boolean) {
        this._autoCollapse = convertToBoolProperty(value);
    }

    protected destroy$ = new Subject<void>();

    constructor(@Inject(APP_WINDOW) protected window,
        @Inject(PLATFORM_ID) protected platformId,
        protected menuInternalService: MenuInternalService,
        protected router: Router) {
    }

    ngOnInit() {
        this.menuInternalService.prepareItems(this.items);

        this.menuInternalService
            .onAddItem()
            .pipe(
                filter((data: { tag: string; items: MenuItem[] }) => this.compareTag(data.tag)),
                takeUntil(this.destroy$),
            )
            .subscribe(data => this.onAddItem(data));

        this.menuInternalService
            .onNavigateHome()
            .pipe(
                filter((data: { tag: string; items: MenuItem[] }) => this.compareTag(data.tag)),
                takeUntil(this.destroy$),
            )
            .subscribe(() => this.navigateHome());

        this.menuInternalService
            .onGetSelectedItem()
            .subscribe((data) => {
                data.listener.next({ tag: this.tag, item: this.getSelectedItem(this.items) });
            });

        this.menuInternalService
            .onCollapseAll()
            .pipe(
                filter((data: { tag: string }) => this.compareTag(data.tag)),
                takeUntil(this.destroy$),
            )
            .subscribe(() => this.collapseAll());

        this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                takeUntil(this.destroy$),
            )
            .subscribe(() => {
                this.menuInternalService.selectFromUrl(this.items, this.tag, this.autoCollapse);
            });
    }

    ngAfterViewInit() {
        setTimeout(() => this.menuInternalService.selectFromUrl(this.items, this.tag, this.autoCollapse));
    }

    onAddItem(data: { tag: string; items: MenuItem[] }) {
        this.items.push(...data.items);
        this.menuInternalService.prepareItems(this.items);
        this.menuInternalService.selectFromUrl(this.items, this.tag, this.autoCollapse);
    }

    onHoverItem(item: MenuItem) {
        this.menuInternalService.itemHover(item, this.tag);
    }

    onToggleSubMenu(item: MenuItem) {
        if (this.autoCollapse) {
            this.menuInternalService.collapseAll(this.items, this.tag, item);
        }
        item.expanded = !item.expanded;
        this.menuInternalService.submenuToggle(item, this.tag);
    }

    // TODO: is not fired on page reload
    onSelectItem(item: MenuItem) {
        this.menuInternalService.selectItem(item, this.items, this.autoCollapse, this.tag);
    }

    onItemClick(item: MenuItem) {
        this.menuInternalService.itemClick(item, this.tag);
    }

    protected navigateHome() {
        const homeItem = this.getHomeItem(this.items);

        if (homeItem) {
            if (homeItem.path) {
                const extras: NavigationExtras = {
                    queryParams: homeItem.queryParams,
                    queryParamsHandling: homeItem.queryParamsHandling,
                    fragment: homeItem.fragment,
                    preserveFragment: homeItem.preserveFragment,
                };
                this.router.navigate([homeItem.path], extras);
            }

            if (homeItem.url && isPlatformBrowser(this.platformId)) {
                this.window.location.href = homeItem.url;
            }
        }
    }

    protected collapseAll() {
        this.menuInternalService.collapseAll(this.items, this.tag);
    }

    protected getHomeItem(items: MenuItem[]): MenuItem {
        for (const item of items) {
            if (item.home) {
                return item;
            }

            const homeItem = item.children && this.getHomeItem(item.children);
            if (homeItem) {
                return homeItem;
            }
        }
        return {} as MenuItem;
    }

    protected compareTag(tag: string) {
        return !tag || tag === this.tag;
    }

    protected getSelectedItem(items: MenuItem[]): MenuItem {
        let selected = null;
        items.forEach((item: MenuItem) => {
            if (item.selected) {
                selected = item;
            }
            if (item.selected && item.children && item.children.length > 0) {
                selected = this.getSelectedItem(item.children);
            }
        });
        return selected;
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
