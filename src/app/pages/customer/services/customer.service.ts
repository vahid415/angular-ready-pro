import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GenericCrudService, ApiService } from '@app/core';

import { CustomerDto } from '../models/customer.dto';

const CONTROLLER = 'entity-controller/';
@Injectable()

export class CustomerService extends GenericCrudService {
    url = CONTROLLER
    constructor(public http: ApiService) {
        super(CONTROLLER, http, CustomerDto);
    }

    forTest(): Observable<any> {
        return this.http.post(`${CONTROLLER}${'save'}`, { id: 1, user: 'ali', gender: 'man' });
    }
}
