import { Component, Input, ViewContainerRef }                         					from '@angular/core';

import { Logger, MkFormService, MkForm }								from 'mk';

import { Producto, ProductoInterface }				    				from '../../models/producto.model';			

import { environment }													from '../../../environments/environment';
import { MatDialog } 													from '@angular/material';

import { UserInfoDialog } from '../dialogs/user-info-dialog.component';

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
	}

	private _suite: string;

	private _id: number|string;
	private _title: string;
	private _img: string;
	private _redirect: string;
	private	_code: string;
	private _state: string;
	private _ids: any;

	public constructor ( 
		private logger: Logger, 
		private window: Window,
		private _fs: MkFormService,
		private _dialog: MatDialog,
		private _vcr: ViewContainerRef ) 
	{ 
		logger.log('COURSE CARD COMPONENT'); 
		this._suite = environment.suiteUrl;
		this._ids = {'user' : '154'};
	}

	private go () : void 
	{
		if (this._state === 'no iniciado')
		{
			let dialogRef = this._dialog.open(UserInfoDialog, {
				id: 'user-info-dialog',
				data: {
					_ids: this._ids,
					_vcr: this._vcr
				}
			});
		} else {
			window.open(environment.ssoRedirectUrl + this._code);
		}
	}
}