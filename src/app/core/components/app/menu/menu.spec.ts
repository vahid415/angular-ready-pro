import { Router, Routes } from '@angular/router';
import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
    Component, Injectable,
    Input, QueryList, ViewChild, ViewChildren
} from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { SpyLocation } from '@angular/common/testing';
import { MenuInternalService, MenuService } from './menu.service';
import { MenuItem } from './menu-item';
import { MenuComponent } from './menu.component';
import { MenuModule } from './menu.module';
import {
    getPathPartOfUrl, isFragmentEqual,
    isUrlPathContain, isUrlPathEqual
} from './url-matching-helpers';

@Component({ template: '' })
export class NoopComponent { }

@Component({
    template: `<app-menu [items]="items" [tag]="menuTag"></app-menu>`,
})
export class SingleMenuTestComponent {
    constructor(public menuPublicService: MenuService) { }
    @Input() items: MenuItem[];
    @Input() menuTag: string;
    @ViewChild(MenuComponent) menuComponent: MenuComponent;
}

@Component({
    template: `
      <app-menu [items]="firstMenuItems" [tag]="firstMenuTag"></app-menu>
      <app-menu [items]="secondMenuItems" [tag]="secondMenuTag"></app-menu>
    `,
})
export class DoubleMenusTestComponent {
    constructor(public menuPublicService: MenuService) { }
    @Input() firstMenuItems: MenuItem[];
    @Input() secondMenuItems: MenuItem[];
    @Input() firstMenuTag: string;
    @Input() secondMenuTag: string;
    @ViewChildren(MenuComponent) menuComponent: QueryList<MenuComponent>;
}

@Injectable()
export class SpyLocationPathParameter extends SpyLocation {
    path(includeHash: boolean = false): string {
        const path = super.path();

        if (includeHash) {
            return path;
        }

        return getPathPartOfUrl(path);
    }
}
function createTestBed(routes: Routes = []) {
    TestBed.configureTestingModule({
        imports: [
            // MenuModule.forRoot(),
            RouterTestingModule.withRoutes(routes),
            NoopAnimationsModule,
        ],
        declarations: [SingleMenuTestComponent, DoubleMenusTestComponent, NoopComponent],
        providers: [MenuService]
    }).compileComponents();

    TestBed.overrideProvider(Location, { useValue: new SpyLocationPathParameter() });
}

function createSingleMenuComponent(menuItems, menuTag = 'menu') {
    createTestBed();
    const fixture = TestBed.createComponent(SingleMenuTestComponent);
    fixture.componentInstance.items = menuItems;
    fixture.componentInstance.menuTag = menuTag;
    const menuService = fixture.componentInstance.menuPublicService;
    fixture.detectChanges();
    return { fixture, menuService };
}

function createDoubleMenuComponent(firstMenuItems, firstMenuTag, secondMenuItems, secondMenuTag) {
    createTestBed();
    const fixture = TestBed.createComponent(DoubleMenusTestComponent);
    fixture.componentInstance.firstMenuItems = firstMenuItems;
    fixture.componentInstance.secondMenuItems = secondMenuItems;
    fixture.componentInstance.firstMenuTag = firstMenuTag;
    fixture.componentInstance.secondMenuTag = secondMenuTag;
    const menuService = fixture.componentInstance.menuPublicService;
    fixture.detectChanges();
    return { fixture, menuService };
}

function createMenuItems(items: Partial<MenuItem>[], menuInternaleService: MenuInternalService): MenuItem[] {
    menuInternaleService.prepareItems(items as MenuItem[]);
    return items as MenuItem[];
}

describe('MenuService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [MenuService],
        });
    });

    it('should be created', inject([MenuService], (service: MenuService) => {
        expect(service).toBeTruthy();
    }));
    it('should add new items to DOM', () => {
        // const { fixture, menuService } = createSingleMenuComponent([{ title: 'Existing item' }]);
        // const itemToAdd = { title: 'Added item' };
        // const menuListOnInit = fixture.nativeElement.querySelectorAll('li').length;
        // menuService.addItems([itemToAdd], 'menu');
        // fixture.detectChanges();
        // const menuListItemAdded = fixture.nativeElement.querySelectorAll('li').length;
        // expect(menuListItemAdded).toEqual(menuListOnInit + 1);
    });
});

describe('NbMenuInternalService', () => {
    let router: Router;
    let menuInternalService: MenuInternalService;

    beforeEach(() => {
        const routes = [
            { path: 'menu-1', component: NoopComponent },
            { path: 'menu-1/2', component: NoopComponent },
            {
                path: 'menu-2',
                component: NoopComponent,
                children: [{ path: 'menu-2-level-2', component: NoopComponent }],
            },
        ];
        createTestBed(routes);
        router = TestBed.inject(Router);
        menuInternalService = TestBed.inject(MenuInternalService);
        menuInternalService = new MenuInternalService(new SpyLocationPathParameter());
    });

    describe('selectFromUrl pathMatch full', () => {
        // it('should select menu item with matching path', (done) => {
        //     const items: Partial<MenuItem>[] = [{ path: '/menu-1' }];
        //     const menuItems: MenuItem[] = createMenuItems(items, menuInternalService);
        //     const menuItem: MenuItem = menuItems[0];

        //     expect(menuItem.selected).toBeFalsy();

        //     router.navigate([menuItem.path])
        //         .then(() => {
        //             menuInternalService.selectFromUrl(menuItems, '');
        //             expect(menuItem.selected).toEqual(true);
        //             done();
        //         });
        // });
    });

    describe('selectFromUrl pathMatch prefix', () => {
        // it('should select menu item if url contains menu link', (done) => {
        // const items: Partial<MenuItem>[] = [{ path: '/menu-1', pathMatch: 'prefix' }];
        // const menuItems: MenuItem[] = createMenuItems(items, menuInternalService);
        // const menuItem: MenuItem = menuItems[0];

        // expect(menuItem.selected).toBeFalsy();

        // const url = `${menuItem.path}/2`;
        // router.navigate([url])
        // .then(() => {
        // menuInternalService.selectFromUrl(menuItems, '');
        // expect(menuItem.selected).toEqual(true);
        // done();
        // });
        // });
    });
});

describe('menu URL helpers', () => {
    it('isUrlPathEqual should work for identical paths', () => {
        expect(isUrlPathEqual('/a/b/c', '/a/b')).toBeFalsy();
        expect(isUrlPathEqual('/a/b/c', '/a/b/c')).toBeTruthy();
    });
    it('isFragmentEqual should return false for path with different fragments', () => {
        expect(isFragmentEqual('/a/b#f', 'fragment')).toBeFalsy();
        expect(isFragmentEqual('/a/b/c?a=1;b=2&c=3#f', 'fragment')).toBeFalsy();
    });
});

