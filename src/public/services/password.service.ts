import { Inject, Injectable, Optional }					from '@angular/core';
import { Response, Http } 								from "@angular/http";
import { Observable, BehaviorSubject } 					from "rxjs/Rx"; 

import { environment }									from '../../environments/environment';

import { DataServiceInterface }							from 'mk';
import { DataService }									from 'mk';

import { Logger }										from 'mk';
import { Loader }										from 'mk';

import { Registro, RegistroInterface }				    from '../models/registro.model';

export class PasswordService
{
	private _apiUrl: string = environment.apiUrl;
	private _recoveryMail: string = environment.recoveryMail;
	private _newPassword: string = environment.newPassword;

	public constructor ( private http: Http, private loader: Loader, private logger: Logger )
	{
		
	}

	public recoveryMail ( data: {[key:string]:any} ) : Observable<any>
	{
		//return this.http.post(this._apiUrl + '/' + this._recoveryMail,data);
		return this.http.get(this._apiUrl + '/' + this._recoveryMail,data);
	} 

	public newPass ( data: { usr: string, pass: string } ) : Observable<any>
	{
		let d: any = data;
		//return this.http.post(this._apiUrl + '/' + this._newPassword,data);
		return this.http.get(this._apiUrl + '/' + this._recoveryMail, d);
	} 
}