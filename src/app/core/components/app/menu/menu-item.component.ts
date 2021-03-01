import {
    animate, state, style,
    transition, trigger
} from '@angular/animations';
import {
    AfterViewInit, Component, DoCheck,
    EventEmitter, Input, OnDestroy, Output
} from '@angular/core';
import { Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { MenuItem } from './menu-item';
import { MenuService, MenuBag } from './menu.service';
import { LayoutDirectionService, } from '../../../_services/direction.service';


// eslint-disable-next-line no-shadow
export enum ToggleStates {
    Expanded = 'expanded',
    Collapsed = 'collapsed',
}
@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[MenuItem]',
    templateUrl: './menu-item.component.html',
    animations: [
        trigger('toggle', [
            state(ToggleStates.Collapsed, style({ height: '0', margin: '0' })),
            state(ToggleStates.Expanded, style({ height: '*' })),
            transition(`${ToggleStates.Collapsed} <=> ${ToggleStates.Expanded}`, animate(300)),
        ]),
    ],
})
export class MenuItemComponent implements DoCheck, AfterViewInit, OnDestroy {
    @Input() menuItem = <MenuItem>null;

    @Output() hoverItem = new EventEmitter<any>();
    @Output() toggleSubMenu = new EventEmitter<any>();
    @Output() selectItem = new EventEmitter<any>();
    @Output() itemClick = new EventEmitter<any>();

    protected destroy$ = new Subject<void>();
    toggleState: ToggleStates;
    constructor(protected menuService: MenuService,
        protected directionService: LayoutDirectionService) { }

    ngDoCheck() {
        this.toggleState = this.menuItem.expanded ? ToggleStates.Expanded : ToggleStates.Collapsed;
    }

    ngAfterViewInit() {
        this.menuService.onSubmenuToggle()
            .pipe(
                filter(({ item }) => item === this.menuItem),
                map(({ item }: MenuBag) => item.expanded),
                takeUntil(this.destroy$),
            )
            .subscribe(isExpanded => {
                this.toggleState = isExpanded ? ToggleStates.Expanded : ToggleStates.Collapsed;
                if (isExpanded && this.directionService.toggleState === 'compacted') {
                    this.directionService.toggleSideBar();
                }
            });
    }


    onToggleSubMenu(item: MenuItem) {
        this.toggleSubMenu.emit(item);
    }

    onHoverItem(item: MenuItem) {
        this.hoverItem.emit(item);
    }

    onSelectItem(item: MenuItem) {
        this.selectItem.emit(item);
    }

    onItemClick(item: MenuItem) {
        this.itemClick.emit(item);
    }

    getExpandStateIcon(): string {
        if (this.menuItem.expanded) {
            return 'fa fa-angle-down';
        }
        return this.directionService.isLtr()
            ? 'fa fa-angle-right'
            : 'fa fa-angle-left';
    }
    getTooltipPlacement(): string {
        return this.directionService.isLtr()
            ? 'right'
            : 'left';
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
