import { Inject, Injectable, Optional }							from '@angular/core';
import { Response, Http } 										from "@angular/http";
import { Observable, BehaviorSubject } 							from "rxjs/Rx"; 
		
import { environment }											from '../../environments/environment';
		
import { DataServiceInterface }									from 'mk';
import { DataService }											from 'mk';
		
import { Logger }												from 'mk';
import { Loader }												from 'mk';
		
import { Producto, ProductoInterface }				    		from '../models/producto.model';

import { Sello, SelloInterface }                				from '../models/sello.model';
import { EntidadCertificadora, EntidadCertificadoraInterface } 	from '../models/entidad-certificadora.model';
import { Licencia, LicenciaInterface }              			from '../models/licencia.model';
import { AuthService } from '../../shared/services/auth.service';

export class CoursesService extends DataService<Producto>
{
	private _prodUrl: string = environment.getConsumerProducts;

	public constructor ( 
		private http: Http, 
		private loader: Loader, 
		private logger: Logger,
		private _as: AuthService )
	{
		super(Producto, logger, loader);
	}


	public getById ( id: number|string ) : Observable<any> 
	{		
		return null
	};

	public list ( data: {[key:string]:any} ) : Observable<any>
	{
		//return this.http.post(this._prodUrl,data)
		let user_id = this._as.getToken();

		return this.http.get(this._prodUrl + user_id,data)
		.map( (resp: any) =>
		{
			let datos: any = resp.json();
			let productos: Array<Producto> = new Array();
			let aux: any;

			for (let p of datos.data)
			{
				aux = p; 
				aux.stamp = new Sello(aux.stamp);
				aux.certifying_entity = new EntidadCertificadora(aux.certifying_entity);
				aux.licenses = new Licencia(aux.licenses[0]);
				productos.push(new Producto(aux));
			}
			resp.data = productos;
			console.log(datos);
			return resp;
		});
	} 
}