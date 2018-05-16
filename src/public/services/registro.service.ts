import { Inject, Injectable, Optional }					from '@angular/core';
import { Response, Http } 								from "@angular/http";
import { Observable, BehaviorSubject } 					from "rxjs/Rx"; 

import { environment }									from '../../environments/environment';

import { DataServiceInterface }							from 'mk';
import { DataService }									from 'mk';

import { Logger }										from 'mk';
import { Loader }										from 'mk';

import { Registro, RegistroInterface }				    from '../models/registro.model';

export class RegistroService extends DataService<Registro>
{
	private _dsUrl: string = environment.dsUrl;

	public constructor ( 
		private http: Http, 
		private loader: Loader, 
		private logger: Logger )
	{
		super(Registro, logger, loader);

		//this._dataStore[this.type_name] = [{registro_id:0}];
	}


	public getById ( id: number|string ) : Observable<any> 
	{
		return null
	};

	public register ( data: {[key:string]:any} ) : Observable<any>
	{
		return this.http.post(this._dsUrl,data)
		.map( (response : any) => { 
			console.log(data)
			console.log(response) 
		});
	} 
}