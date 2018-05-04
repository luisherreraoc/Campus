import { Injectable }     																from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot }             from '@angular/router';
import { Loader, Logger }																from 'mk';

import { AuthService } 																	from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate 
{


  	constructor ( private _logger: Logger, private _loader: Loader, private _as: AuthService, private _router: Router )
  	{
  		_logger.log('AUTH-GUARD');
  	}

  	public canActivate( router: ActivatedRouteSnapshot, state: RouterStateSnapshot ) : boolean
  	{
    	this._logger.error('AuthGuard #canActivate called');
    	
    	let url: string = state.url;
    	return this.checkLogin(url);
  	}

  	public canActivateChild( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): boolean 
  	{
    	return this.canActivate(route, state);
  	}

  	private checkLogin ( url: string ) : boolean
  	{
  		let ret: boolean = this._as.isLoggedIn();
  		if ( !ret )
  		{
  			this._as.redirectUrl = url;
  			this._router.navigate(['public/login']);
  		}
  		return ret;
  	}
}