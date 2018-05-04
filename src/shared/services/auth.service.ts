import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

import { environment }                                                          from '../../environments/environment';

import { Logger, Loader }	from 'mk';

@Injectable()
export class AuthService 
{
	// store the URL so we can redirect after logging in
  	private _redirectUrl: string;
	private _ssoLogin: string;

	public constructor ( private _http: Http, private _logger: Logger, private _loader: Loader )
	{
		this._ssoLogin = environment.ssoLoginUrl;
	}

	public get redirectUrl () : string { return this._redirectUrl; }

	public set redirectUrl ( url: string ) { this._redirectUrl = url; }

  	public login( data: any ): Observable<Response> 
  	{
  	  	return this._http.post( this._ssoLogin, data );
  	}
	
  	public logout(): void 
  	{
  	  	
  	}

  	public isLoggedIn () : boolean
  	{
  		return true;
  	}
}