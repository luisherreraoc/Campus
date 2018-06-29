import { Component, Inject, ViewContainerRef } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from "rxjs/Rx";

import { environment } from '../../../environments/environment';

import { Logger, MkFormService, MkForm } from 'mk';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { UserJobsDialogComponent } from '../dialogs/user-jobs-dialog.component';

import { AuthService } from '../../../shared/services/auth.service';
import { UserService } from '../../services/user.service';

import { User } from '../../models/user.model';

import { Loader } from 'mk';

@Component({
	templateUrl: './acount.component.html',
	styleUrls: ['./acount.component.scss']
})
export class AcountComponent
{
	private _form: MkForm;
	private _subscriptions: Array<Subscription>;

	private _onl1: Array<string>;
	private _onl2: Array<string>;
	private _key: string;

	private _ids: any;

	private _pass_change: string;

	// private showMe: boolean;

	public constructor ( 
		private logger: Logger, 
		private _fs: MkFormService, 
		private _dialog: MatDialog, 
		private _vcr: ViewContainerRef, 
		private _as: AuthService,
		private _us: UserService,
		private _loader: Loader ) 
	{ 
		logger.log('ACOUNT COMPONENT'); 

		this._onl1 = ['oauth_user_first_name', 'oauth_user_last_name'];
		this._onl2 = ['user_details_prefix', 'oauth_user_phone'];
	 	this._key = environment.icon_key;
	 	this._ids = null;

	 	this._pass_change = environment.pathPasswordChange;
		this._form = null;
	}

	public ngOnInit () : void
	{
		let source: User = this._us.users.getValue().find( (usr:User) => usr['token'] === this._as.getToken() );
		let obs: Observable<any> = source ? Observable.of(source) : this._us.get(this._as.getToken());

		this._loader.show('acount');

		this._subscriptions = [	this.subscriptions(obs) ];
	}	

	public ngOnDestroy () : void 
    { 
        this._subscriptions.forEach( sub => sub.unsubscribe() );
        this._subscriptions.length = 0;
		this._loader.dismiss('acount'); 
    }

    private subscriptions ( observable: Observable<any> ) : Subscription
    {
    	return observable
    	.switchMap( ( user:any, i:number ) => 
    	{
    		if ( user.oauth_user_id === undefined ) {
    			this._as.logout();
			}
    		this._ids = {'user': user.oauth_user_id }; 
    		return this._fs.forms.map( forms => forms.find( form => form.name === "user" ));
    	})
    	.subscribe( form =>
        {
        	if (form) 
            { 	
            	this._form = form;
				this._loader.dismiss('acount');
			}
        },
        (error) => {},
        () => this._loader.dismiss('acount'));
	}
	
    private openFirstDialog() : void
    {
    	let dialogRef = this._dialog.open(UserJobsDialogComponent, {
    		id: 'user-jobs-dialog',
    		panelClass: 'custom-dialog',
			viewContainerRef: this._vcr,
      		data: { 
				ids: this._ids, 
				ref: this._vcr
			}
		});
	}
}