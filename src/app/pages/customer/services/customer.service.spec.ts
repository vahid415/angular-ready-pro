import { ApiService } from '@app/core';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CustomerService } from './customer.service';

const user = {
    id: 1,
    user: 'ali',
    gender: 'man'
};
describe('CustomerService', () => {
    let service: CustomerService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [CustomerService],
        });
    });

    it('get user info should return value from api service',
        (res: any) => {
            const http = {
                get: jest.fn()
            };
            service = new CustomerService(new ApiService(http));
            service.forTest().subscribe(value => {
                expect(value);
                res();
            });
        });
});
