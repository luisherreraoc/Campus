import { Component, Input }                         					from '@angular/core';

import { Logger }														from 'mk';

import { Producto, ProductoInterface }				    				from '../../models/producto.model';			

import { environment }													from '../../../environments/environment';

@Component({
	selector: 'course-card',
	templateUrl: './course-card.component.html',
	styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent
{
	@Input('course') set course ( c: any )
	{
		debugger
		this._id = c.producto_id;
		this._title = c.producto_nombre;
		this._img = this._suite + c.producto_informacion_multimedia.default_image;
		this._redirect = c.producto_url_acceso;
		this._code = c.producto_licencia.licencia_codigo;
	}

	private _suite: string;

	private _id: number|string;
	private _title: string;
	private _img: string;
	private _redirect: string;
	private	_code: string;

	public constructor ( private logger: Logger, private window: Window ) 
	{ 
		logger.log('COURSE CARD COMPONENT'); 
		this._suite = environment.suiteUrl;
	}

	private go () : void 
	{
		window.open(environment.ssoRedirectUrl + this._code);
	}
}