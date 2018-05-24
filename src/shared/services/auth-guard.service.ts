import { Injectable }                                                                     from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, PRIMARY_OUTLET, UrlTree, UrlSegmentGroup, UrlSegment }             from '@angular/router';
import { Loader, Logger }                                                                from 'mk';

import { AuthService }                                                                     from './auth.service';

import { environment }                                                                  from '../../environments/environment';

@Injectable()
export class AuthGuard implements CanActivate 
{
    private _campusSegment: string;
    private _publicSegment: string;

    constructor ( private _logger: Logger, private _loader: Loader, private _as: AuthService, private _router: Router )
    {
        _logger.log('AUTH-GUARD');

        this._campusSegment = environment.pathCampus;
        this._publicSegment = environment.pathPublic;
    }

    public canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) : boolean
    {
        return this.checkLogin(state);
    }

    public canActivateChild( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): boolean 
    {       
        return this.canActivate(route, state);
    }

    private checkLogin ( state: RouterStateSnapshot ) : boolean
    {
        let loged: boolean = this._as.isLoggedIn();
        let path: string = this.getFragmanet(state);
        let loginPath: string = environment.pathPublic + '/' + environment.pathLogin;
        if ( !loged )
        {
            this._as.redirectUrl = path === environment.pathCampus ? state.url : null;
            this._router.navigate([loginPath]);
        }
        return loged;
    }

    private getFragmanet ( state: RouterStateSnapshot ) : string
    {
        let tree: UrlTree = this._router.parseUrl(state.url);
        let g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
        let s: UrlSegment[] = g.segments;
        return s[0].path;
    } 
}