import { Component, Inject, ViewContainerRef, ViewChild, ElementRef, SimpleChange, SimpleChanges } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from "rxjs/Rx";

import { environment } from '../../../environments/environment';

import { Logger, MkFormService, MkForm } from 'mk';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { UserJobsDialogComponent } from '../dialogs/user-jobs-dialog.component';

import { AuthService } from '../../../shared/services/auth.service';
import { UserService } from '../../services/user.service';

import { User } from '../../models/user.model';

import { Loader } from 'mk';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
	templateUrl: './acount.component.html',
	styleUrls: ['./acount.component.scss']
})
export class AcountComponent
{
	@ViewChild('button') private _button: ElementRef;

	private _form: MkForm;
	private _form_group: FormGroup;
	private _subscriptions: Array<Subscription>;

	private _onl1: Array<string>;
	private _onl2: Array<string>;
	private _onl3: Array<string>;
	private _key: string;

	private _ids: any;

	private _pass_change: string;

	private _response_obj: {title:string,text:string,img:string,btn:string,callback:any};
	private _sent: boolean;

	private _user : any;
	private julome : Array<any>;
	// private showMe: boolean;

	public constructor ( 
		private logger: Logger, 
		private _fs: MkFormService, 
		private _dialog: MatDialog, 
		private _vcr: ViewContainerRef, 
		private _as: AuthService,
		private _us: UserService,
		private _loader: Loader,
		private _router: Router ) 
	{ 
		logger.log('ACOUNT COMPONENT'); 

		this._onl1 = ['oauth_user_first_name', 'oauth_user_last_name'];
		this._onl2 = ['user_details_prefix', 'oauth_user_phone'];
		this._onl3 = ['oauth_user_dni', 'oauth_user_email'];
	 	this._key = environment.icon_key;
	 	this._ids = null;

	 	this._pass_change = environment.pathPasswordChange;
		this._form = null;

		this._response_obj = {
            title: '',
            text: '',
            img: '',
            btn: '',
            callback: null
		};
		this._sent = false;

		this.julome = [];
	}

	public ngOnInit () : void
	{
		let source: User = this._us.users.getValue().find( (usr:User) => usr['token'] === this._as.getToken() );
		let obs: Observable<any> = source ? Observable.of(source) : this._us.get(this._as.getToken());
		
		this._loader.show('acount');

		this._subscriptions = [	this.subscriptions(obs), this.getUserDetails(obs) ];
	}

	public ngOnChanges (changes: SimpleChanges) : void {
		console.log('something happened')
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
				this._form_group = this._form.formGroup;
				this._loader.dismiss('acount');
			}
        },
        (error) => {},
        () => this._loader.dismiss('acount'));
	}

	private getUserDetails (obs : Observable<any>) : Subscription {
		
		return obs.subscribe( user => {
			this._us.getById(user.oauth_user_id)
			.subscribe((user :any) => {
				this._user = JSON.parse(user._body);

				let user_details = this._user.data.oauth_user_details;

				let pitart = [];

				for (let seak in user_details) {
					if(user_details[seak].user_details_key !== 'prefix')
					{
						pitart.push(user_details[seak].user_details_value);
					}
				}

				let renato = '';

				for (let i=0; i < pitart.length; i++) {
					if (i !== pitart.length -1 ) {
						renato = pitart[i] + ' - ';
					} else {
						renato = pitart[i]
					}
					this.julome.push(renato);
				}
			})
		})
	}


	private falseClick() {
        let clickMe = this._button.nativeElement;

        clickMe.click();
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
		})
		.afterClosed().subscribe( result => {
			if (result.sent) {
				this._sent = true;
				this._response_obj = {
					title: '',
					text: 'Sus datos se han actualizado correctamente',
					img: '',
					btn: 'VOLVER',
					callback: this.goToAccount
				}
			} else if (result.error) {
				this._sent = true;
				this._response_obj = {
					title: '',
					text: 'Ha habido un error a la hora de actualizar sus datos. Por favor, vuelva a intentarlo',
					img: '',
					btn: 'VOLVER',
					callback: this.goToAccount
				}
			}
		});
	}

	private goToAccount () : void {
		this._sent = false;
	}

	private send () : void {
		let aux = this._form_group.getRawValue();
            
		let data = {
			'first_name': aux.oauth_user_first_name,
			'last_name': aux.oauth_user_last_name,
			'phone': aux.oauth_user_phone
		}
		this._us.update(data)
        .subscribe( (response: any ) =>
        {
            let user : any = this._us.data.find((user : any) => {
                return user.oauth_user_id == this._ids.user
            })
            
            user.oauth_user_first_name = aux.oauth_user_first_name;
            user.oauth_user_last_name = aux.oauth_user_last_name;
            user.oauth_user_phone = aux.oath_user_phone;
            user.user_details_prefix = aux.user_details_prefix;
		},
		( error : any ) => {
			this._sent = true;
			this._response_obj = {
				title: '',
				text: 'Ha habido un error a la hora de actualizar sus datos. Por favor, vuelva a intentarlo',
				img: '',
				btn: 'VOLVER',
				callback: this.goToAccount
			}
        },
        () => {
			this._sent = true;
			this._response_obj = {
				title: '',
				text: 'Sus datos se han actualizado correctamente',
				img: '',
				btn: 'VOLVER',
				callback: this.goToAccount
			}
        }
        );
	}
}