import { Inject, Injectable, Optional }					from '@angular/core';
import { Response, Http } 								from "@angular/http";
import { Observable, BehaviorSubject } 					from "rxjs/Rx"; 

import { environment }									from '../../environments/environment';

import { DataServiceInterface }							from 'mk';
import { DataService }									from 'mk';

import { Logger }										from 'mk';
import { Loader }										from 'mk';

import { User, UserInterface }				    		from '../models/user.model';

import { AuthService } from '../../shared/services/auth.service';

export class UserService extends DataService<User>
{

	private _dsUrl: string = environment.dsUrl;

	private stamp_id : string;

	public constructor ( 
		private http: Http, 
		private loader: Loader, 
		private logger: Logger,
		private _as: AuthService )
	{
		super(User, logger, loader);

		console.log(_as);
	}

	public getById ( id: number|string ) : Observable<Response> 
	{	
		return this.http.get('./mocks/user.json');
	};

	public passwordChange ( data: any ) : Observable<Response>
	{
		return this.http.post( environment.dsUrl + environment.apiPasswordChange + this._as.getToken(), data ).map(res => res.json());
		//return this.http.get( environment.apiUrl + environment.apiPasswordChange, data ).map( res => res.json() );
	}

	public register ( data: {[key:string]:any} ) : Observable<any>
	{
		return this.http.post(this._dsUrl,data);
	} 

	public saveAvantar ( img: string ) : Observable<any>
	{
		debugger
		return this.http.post('http://ds-test.oceano.com/api/test/post',img);
	}
}