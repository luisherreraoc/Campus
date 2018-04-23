import { Inject, Injectable, Optional }					from '@angular/core';
import { Response, Http } 								from "@angular/http";
import { Observable, BehaviorSubject } 					from "rxjs/Rx"; 

import { DataServiceInterface }							from 'mk';
import { DataService }									from 'mk';

import { Logger }										from 'mk';
import { Loader }										from 'mk';

import { Registro, RegistroInterface }				    from './registro.model';

export class RegistroService extends DataService<Registro>
{

	public constructor ( 
		private http: Http, 
		private loader: Loader, 
		private logger: Logger )
	{
		super(Registro, logger, loader);

		this._dataStore[this.type_name] = [{registro_id:0}];
	}


	public getById ( id: number|string ) : Observable<any> 
	{
		debugger;
		console.log("GETBYID");
		return null//this.http.get('./public/components/registro/registro.json');
	};
}