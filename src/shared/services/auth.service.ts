import { Injectable, Inject }                                                   from '@angular/core';
import { Http, Response }                                                       from '@angular/http';
import { Observable }                                                           from 'rxjs/Observable';

import { StorageService }                                                       from './storage.service';
import { environment }                                                          from '../../environments/environment';
import { Logger, Loader }	                                                    from 'mk';

@Injectable()
export class AuthService 
{
	// store the URL so we can redirect after logging in
  	private _redirectUrl: string;
	  private _ssoLogin: string;

    private _user_id: string;

	public constructor ( private _http: Http, private _logger: Logger, private _loader: Loader, private _storage: StorageService )
	{
		this._ssoLogin = environment.ssoLoginUrl;
        this._user_id = 'token';
	}

	public get redirectUrl () : string { return this._redirectUrl; }

	public set redirectUrl ( url: string ) { this._redirectUrl = url; }

  	public login( data: any ): Observable<Response> 
  	{
  	  	return this._http.post( this._ssoLogin, data )
        .map( (response:any) => {
            let res: any = response.json();
            this._storage.set(this._user_id, res.access_token)
            return res;
        });
  	}
	
  	public logout(): void 
  	{
  	  	this._storage.clear();
  	}

  	public isLoggedIn () : boolean
  	{
  		return this._storage.get(this._user_id) != undefined;
  	}
}