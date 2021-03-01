import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { LayoutDirectionService } from '../../../../../../_services/direction.service';
import { ComponentTreeService } from '../../../../../../_routing/component-tree-service';
import { BreadcrumbItem, BreadcrumbItems, BREADCRUMB_SYMBOL } from '../../../../../../_decorators/types';

@Component({
    selector: 'app-user-area-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss'],
})
export class UserAreaBreadcrumbComponent {
    breadcrumbItemTextSymbol = Symbol('breadcrumbItemTextSymbol');

    constructor(
        private componentTreeService: ComponentTreeService,
        private directionService: LayoutDirectionService,
        private router: Router,
        private title: Title,

    ) {
        componentTreeService.change.subscribe((components) => {
            this.setBrowserTitle();
        });
    }

    getBreadcrumbIcon() {
        return this.directionService.isLtr()
            ? 'fa fa-chevron-right'
            : 'fa fa-chevron-left';
    }

    getBreadcrumbItems() {
        const result: BreadcrumbItem[] = [];
        const components = this.componentTreeService.tree;
        const translateItem = (item: BreadcrumbItem) => {
            item[this.breadcrumbItemTextSymbol] = item.text;
        };

        components.filter(c => c[BREADCRUMB_SYMBOL] != null)
            .forEach(c => {
                let items: BreadcrumbItem | BreadcrumbItems = c[c[BREADCRUMB_SYMBOL]];
                items = Array.isArray(items) ? items : [items];
                items.forEach(i => {
                    translateItem(i);
                    result.push(i);
                });
            });

        return result.filter(i => i.show !== false);
    }

    private setBrowserTitle() {
        const items = this.getBreadcrumbItems();
        if (items.length > 0) {
            const last = items[items.length - 1];
            this.title.setTitle(`${last[this.breadcrumbItemTextSymbol]} - ${'app'}`);
        }
    }

    onItemClick(item: BreadcrumbItem) {
        this.router.navigate(item.path, { relativeTo: item.relativeTo });
    }
}
