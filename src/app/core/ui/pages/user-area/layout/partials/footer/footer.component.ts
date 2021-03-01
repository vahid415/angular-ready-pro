import { Component, OnInit } from '@angular/core';

import { UserIdentityService } from '../../../../../../authentication/user-identity.service';

@Component({
    selector: 'app-user-area-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class UserAreaFooterComponent implements OnInit {
    _user: string;
    _date: any;
    _version = 1;

    constructor(
        private userIdentity: UserIdentityService
    ) {
        this._user = userIdentity.user.fullName;
    }

    ngOnInit(): void {
        this._date = new Date('2/12/1399').toLocaleDateString();
    }
}
