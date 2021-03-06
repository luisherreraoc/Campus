import { Injectable, Injector } from "@angular/core";
import { ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers, XHRBackend} from "@angular/http";
import { Observable } from "rxjs/Rx";
import { Router }                                                                 from '@angular/router';

import { InterceptedHttp } from 'mk';

import { AuthService } from '../services/auth.service';

//import { environment } from "../environments/environment";

export function httpFactoryCustom(xhrBackend: XHRBackend, requestOptions: RequestOptions, injector:Injector ): Http 
{
   return new InterceptedHttpCustom(xhrBackend, requestOptions, injector);
}

@Injectable()
export class InterceptedHttpCustom extends InterceptedHttp 
{
    private _as: AuthService;

    public constructor( backend: ConnectionBackend,  defaultOptions: RequestOptions, private injector: Injector) 
    {
        super(backend, defaultOptions);
        setTimeout(() => this._as = injector.get(AuthService));
    }

    public request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> 
    {
        return super.request(url, options)
        .map( (res: any) => 
        {
            let response: any = res.json();
            if ( response.code === 1945 )
            {
                this._as.logout();
                throw Observable.throw(res);
            }
            return res;
        });
    }

    public get(url: string, options?: RequestOptionsArgs): Observable<Response> 
    {
        url = super.updateUrl(url);
        return super.get(url, super.getRequestOptionArgs(options))
        .map( (res: any) => 
        {
            let response: any = res.json();
            if ( response.code === 1945 )
            {
                this._as.logout();
                throw Observable.throw(res);
            }
            return res;
        })
        .catch(super.handleError);
    }

    public post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> 
    {
        url = super.updateUrl(url);
        return super.post(url, body, super.getRequestOptionArgs(options))
        .map( (res: any) => 
        {
            let response: any = res.json();
            if ( response.code === 1945 )
            {
                this._as.logout();
                throw Observable.throw(res);
            }
            return res;
        })
    }

    public put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> 
    {
        url = super.updateUrl(url);
        return super.put(url, body, super.getRequestOptionArgs(options))
        .map( (res: any) => 
        {
            let response: any = res.json();
            if ( response.code === 1945 )
            {
                this._as.logout();
                throw Observable.throw(res);
            }
            return res;
        })
    }

    public delete(url: string, options?: RequestOptionsArgs): Observable<Response> 
    {
        url = super.updateUrl(url);
        return super.delete(url, super.getRequestOptionArgs(options))
        .map( (res: any) => 
        {
            let response: any = res.json();
            if ( response.code === 1945 )
            {
                this._as.logout();
                throw Observable.throw(res);
            }
            return res;
        })
    }

}