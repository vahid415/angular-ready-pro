import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';

import { HttpOptions } from '../_interceptors/types';
import { ServiceHostToken } from '../authentication/types';

const test = {
    info: {},
    data: { user: 'sam', id: 0 },
    status: 200
};
@Injectable({ providedIn: 'root' })
export class ApiService {
    private _serviceHost: string;
    private _http: HttpClient;
    constructor(private injector: Injector) {
        this._http = injector.get(HttpClient);
        this._serviceHost = injector.get<string>(ServiceHostToken, '');
    }
    /**
     * Constructs a `GET` request that interprets the body as a JSON object and returns
     * the response body in a given type.
     */
    get<T>(url: string, options: HttpOptions): Observable<T> {
        const URL = this.makeUrl(url, options);
        const OPTIONS = this.makeHttpClientOptions(options);
        return this.mapResponse(this._http.get<T>(URL, OPTIONS));
    }
    /**
     * Constructs a `POST` request that interprets the body as a JSON object
     * and returns an observable of the response.
     */
    post(url: string, body: any, options?: HttpOptions): Observable<any> {
        const URL = this.makeUrl(url, options);
        const BODY = this.makeBody(body, options);
        const OPTIONS = this.makeHttpClientOptions(options);
        // return of(test);
        return this.mapResponse(of(body));
    }
    /**
     * Constructs a `PUT` request that interprets the body as a JSON object and
     * returns an observable of the response.
     */
    put<T>(url: string, body: any, options: HttpOptions): Observable<T> {
        const URL = this.makeUrl(url, options);
        const BODY = this.makeBody(body, options);
        const OPTIONS = this.makeHttpClientOptions(options);
        return this.mapResponse(this._http.put(URL, BODY, OPTIONS));
    }

    /**
     * Constructs a `DELETE` request that interprets the body as a text stream and
     *  returns the full `HttpResponse`..
     */

    delete<T>(url: string, options: HttpOptions): Observable<T> {
        const URL = this.makeUrl(url, options);
        const OPTIONS = this.makeHttpClientOptions(options);
        return this.mapResponse(this._http.delete(URL, OPTIONS));
    }

    /**
     * this methode create a valid url for http requests
     * and checking so remove invalid || null || undefiend urls
     */
    private makeUrl(url: string, options?: HttpOptions): string {
        return (options && options.pathType && options.pathType === 'absolute') ? url : (this._serviceHost + url);
    }

    /**
     * this methode create a valid body for any type as http requests
     * and checking so remove invalid || null || undefiend body
     */
    private makeBody(body: any, options?: HttpOptions): any {
        if (!options || !options.contentType || options.contentType !== 'multipart/form-data') {
            return body;
        }
        return body;
    }

    /**
     * this methode create a http requests options
     * and checking so remove invalid || null || undefiend options
     */
    private makeHttpClientOptions(options: any): any {
        // Angular http options
        // write your Logics
        return options;
    }

    /**
     * this methode maping on httpRespons models
     * and return customize response
     */
    private mapResponse(res: Observable<any>): any {
        // write your Logics
        return res.pipe(map((x: { data: any; }) => x.data));
    }
}
