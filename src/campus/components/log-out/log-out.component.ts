import { Component }                                                    from '@angular/core';

import { Logger, Loader }												from 'mk';

import { AuthService }													from '../../../shared/services/auth.service';

@Component({
	selector: 'log-out',
	templateUrl: './log-out.component.html',
	styleUrls: ['./log-out.component.scss'],
})
export class LogOutComponent
{

	public constructor ( 
		private _logger: Logger, 
		private _as: AuthService ) 
	{ 
		_logger.log('Log out Component');
	}

	public ngOnInit () : void
	{

	}

	public ngOnDestroy () : void 
    { 

    }

    public logOut () {
        this._as.logout();
    }
}