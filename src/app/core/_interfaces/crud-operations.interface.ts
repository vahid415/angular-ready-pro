import { Observable } from 'rxjs/internal/Observable';

import { ApiResponse } from './api-response';
import { PagingResponse } from './paging-response.dto';
import { PagingRequest } from '../_models/paging-request.dto';

export interface CrudOperations {
  save<T>(entity: object): Observable<ApiResponse<T>>;

  update<T>(entity: object): Observable<ApiResponse<T>>;

  findById<T>(id: number): Observable<ApiResponse<T>>;

  getPage<T>(pagingReq: PagingRequest): Observable<ApiResponse<PagingResponse>>;

  delete<T>(id: number): Observable<ApiResponse<T>>;
}
