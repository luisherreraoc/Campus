import { Component, Input, ViewContainerRef }                         					from '@angular/core';

import { Logger, MkFormService, MkForm }								from 'mk';

import { Producto, ProductoInterface }				    				from '../../models/producto.model';			

import { environment }													from '../../../environments/environment';
import { MatDialog } 													from '@angular/material';

import { UserInfoDialog } from '../dialogs/user-info-dialog.component';
import { UserService } from '../../services/user.service';

@Component({
	selector: 'course-card',
	templateUrl: './course-card.component.html',
	styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent
{
	@Input('course') set course ( c: any )
	{
		this._id = c.id;
		this._title = c.name;
		this._img = this._suite + '/' + c.multimidia.default_image;
		this._redirect = c.url_access;
		debugger
		this._code = c.license ? c.license.code : null;
		this._state = c.license ? c.license.status : null;
		this._entidad_id = c.certifying_entity ? c.certifying_entity.ce_id : null;
	}

	private _suite: string;

	private _id: number|string;
	private _title: string;
	private _img: string;
	private _redirect: string;
	private	_code: string;
	private _state: string;
	private _ids: any;
	private _entidad_id : any;
	
	private _form : string;
	private _user_previous_info: any;

	public constructor ( 
		private logger: Logger, 
		private window: Window,
		private _fs: MkFormService,
		private _dialog: MatDialog,
		private _vcr: ViewContainerRef,
		private _us: UserService ) 
	{ 
		logger.log('COURSE CARD COMPONENT'); 
		this._suite = environment.suiteUrl;
		this._ids = {'user' : '154'};
	}

	ngOnInit () {
		this._us.getUserData(this._code)
		.subscribe( test => {
			this._user_previous_info = test;
		})

		this._form = "course_entidad_" + this._entidad_id + "_default";
	}

	private go () : void 
	{
		if (this._state === 'untouched')
		{
			let dialogRef = this._dialog.open(UserInfoDialog, {
				id: 'user-info-dialog',
				data: {
					_ids: this._ids,
					_vcr: this._vcr,
					_form: this._form,
					_code: this._code,
					_id: this._entidad_id,
					_values: this._user_previous_info
				},
			});
		} else {
			window.open(environment.ssoRedirectUrl + this._code);
		}
	}
}