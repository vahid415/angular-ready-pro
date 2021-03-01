import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';

import { MenuItems } from '../../../../../../components/app/menu/menu-item';
import { MenuService } from '../../../../../../components/app/menu/menu.service';
import { NavigationService } from '../../../../../../_services/navigation.service';
import { UserIdentityService } from '../../../../../../authentication/user-identity.service';
import { AuthenticationService } from '../../../../../../authentication/authentication.service';
import { LayoutDirectionService } from '../../../../../../_services/direction.service';


@Component({
    selector: 'app-user-area-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class UserAreaHeaderComponent implements OnInit {
    userFullName: string;
    menuServiceSubscription: Subscription;
    userMenu: MenuItems = [
        { data: { id: 'profile' }, icon: 'fa fa-id-card', title: 'profile' },
        { data: { id: 'change-password' }, icon: 'fa fa-user', title: 'change-password' },
        { data: { id: 'log-out' }, icon: 'fa fa-sign-out-alt', title: 'log out' }
    ];
    languageMenu: MenuItems = [
        { data: { id: 'EN_LANG' }, title: 'en' },
        { data: { id: 'FA_LANG' }, title: 'fa' },
    ];
    // eslint-disable-next-line no-useless-constructor
    constructor(
        private userAuthService: AuthenticationService,
        private navService: NavigationService,
        private menuService: MenuService,
        private layoutService: LayoutDirectionService,
        private userIdentity: UserIdentityService
    ) {
        this.userFullName = this.userIdentity.user.fullName;
    }

    ngOnInit(): void {
        this.menuServiceSubscription = this.menuService.onItemClick()
            .pipe(
                filter(({ tag }) => tag === 'user-header-context-menu')
            )
            .subscribe(menu => {
                switch (menu.item.data.id) {
                    case 'log-out':
                        this.onSignOutClick();
                        break;
                    case 'profile':
                        this.goToProfile();
                        break;
                    case 'change-password':
                        break;

                    default:
                        break;
                }
            });
        this.menuServiceSubscription = this.menuService.onItemClick()
            .pipe(
                filter(({ tag }) => tag === 'header-lang-context-menu')
            )
            .subscribe(menu => {
                this.layoutService.setLanguage(menu.item.data.id);
            });
    }

    toggleMenu() {
        this.layoutService.toggleSideBar();
    }

    onSignOutClick(): void {
        this.userAuthService.signOut().subscribe((x) => {
            this.navService.goToSignInPage();
        });
    }

    goToDashboard(): void {
        this.navService.goToDashboardPage();
    }

    goToProfile(): void {
        this.navService.goToTargetPage('profile');
    }

    changeLanguage(lang): void {
        this.layoutService.setLanguage(lang);
    }

    getUserMenuPlacement() {
        return this.layoutService.isRtl()
            ? 'rtl'
            : 'ltr';
    }
}
