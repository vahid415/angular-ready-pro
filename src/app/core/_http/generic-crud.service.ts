import { Observable } from 'rxjs/internal/Observable';

import { ApiService } from './api.service';
import { ApiResponse } from '../_interfaces/api-response';
import { PagingRequest } from '../_models/paging-request.dto';
import { PagingResponse } from '../_interfaces/paging-response.dto';
import { CrudOperations } from '../_interfaces/crud-operations.interface';

export abstract class GenericCrudService implements CrudOperations {
  private _EntityType: any;
  protected baseUrl: string;

  constructor(
    base: string,
    public http: ApiService,
    EntityType: any

  ) {
    this._EntityType = new EntityType();
    this.baseUrl = base;
  }

  save(entity: any): Observable<any> {
    const SAVE_URL = 'save';
    return this.http.post(`${this.baseUrl}${SAVE_URL}`, entity);
  }

  update(entity: any): Observable<any> {
    const UPDATE_URL = 'update';
    return this.http.post(`${this.baseUrl}${UPDATE_URL}`, entity);
  }

  delete(id: number): Observable<any> {
    const DELETE_URL = 'delete';
    return this.http.post(`${this.baseUrl}${DELETE_URL}`, id);
  }

  findById(id: number): Observable<any> {
    const FIND_BY_ID_URL = 'find-by-id';
    return this.http.post(`${this.baseUrl}${FIND_BY_ID_URL}`, id);
  }

  getPage(entity: PagingRequest): Observable<ApiResponse<PagingResponse>> {
    const FIND_PAGING_URL = 'find-paging';
    return this.http.post(
      `${this.baseUrl}${FIND_PAGING_URL}`,
      entity
    );
  }
}
