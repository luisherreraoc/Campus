import { Component, Input, ViewContainerRef, Output, EventEmitter }                         					from '@angular/core';

import { Logger, MkFormService, MkForm }								from 'mk';

import { Producto, ProductoInterface }				    				from '../../models/producto.model';			

import { environment }													from '../../../environments/environment';
import { MatDialog } 													from '@angular/material';

import { UserService } from '../../services/user.service';

import { AuthService } from '../../../shared/services/auth.service';

@Component({
	selector: 'course-card',
	templateUrl: './course-card.component.html',
	styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent
{
	@Input('course') set course ( c: any )
	{
		this._currentCourse = c;
		this._title = c.name;
		this._img = this._suite + '/' + c.multimidia.default_image;
		this._code = c.license ? c.license.code : null;
		this._state = c.license ? c.license.status : null;
		this._entidad_id = c.certifying_entity ? c.certifying_entity.ce_id : null;
		this._expiryDate = c.license ? c.license.deadline : null;
	}
	@Output() iniciar = new EventEmitter<any>();

	private _suite: string;

	private _currentCourse : any;
	private _title: string;
	private _img: string;
	private	_code: string;
	private _state: string;
	private _ids: any;
	private _entidad_id : any;
	private _expiryDate : any;
	
	private _form : string;
	private _user_previous_info: any;

	private _buttonMessage : any;

	private _inactive : boolean;

	public constructor ( 
		private logger: Logger, 
		private window: Window,
		private _fs: MkFormService,
		private _us: UserService,
		private _as: AuthService ) 
	{ 
		logger.log('COURSE CARD COMPONENT'); 
		this._suite = environment.suiteUrl;
		this._ids = {'user' : '154'};
	}

	ngOnInit () {
		this._us.getUserData(this._code)
		.subscribe( info => {
			this._user_previous_info = info;
		})

		this._form = "course_entidad_" + this._entidad_id + "_default";
	
		if (this._state === 'untouched') {
			this._buttonMessage = 'ACTIVAR';
		} else if (this._state === 'pending') {
			this._buttonMessage = 'CEDIDO';
		} else if (this._state === 'active') {
			this._buttonMessage = 'INGRESAR';
		} else if (this._state === 'expired') {
			this._buttonMessage = 'EXPIRADO';
			this._inactive = true;
		} else if (this._state === 'terminated') {
			this._buttonMessage = 'FINALIZADO';
			this._inactive = true;
		} 

	}

	private go () : void 
	{
		if (this._state === 'untouched')
		{
			this.iniciar.emit(this._currentCourse);
		} else {
			let tkn: any = this._as.getToken();
			window.open(environment.ssoRedirectUrl + this._code + '&access_token=' + tkn);
		}
	}
}