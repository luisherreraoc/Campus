import { Inject, Injectable, Optional }					from '@angular/core';
import { Response, Http, ResponseOptions } 								from "@angular/http";
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
	private _apiUrl: string = environment.apiUrl;

	public constructor ( 
		private http: Http, 
		private loader: Loader, 
		private logger: Logger,
		private _as: AuthService )
	{
		super(User, logger, loader);
	}

	public get users () : BehaviorSubject<Array<User>>
	{
		return this.subject;
	}

	public getById ( id: number|string ) : Observable<Response> 
	{	
		return this.http.get(this._dsUrl + '/api/user/' + id)
		.map( (data:any) => 
		{ 
			let res: Response;
			let opt: ResponseOptions;
			let bod: any = data.json();

			bod.data.token = this._as.getToken();

			opt = new ResponseOptions();
			res = new Response( opt.merge({
				body: JSON.stringify(bod),
				status: data.status,
				statusText: data.statusText,
				headers: data.headers,
				type: data.type,
				url: data.url
			}));

			return res; 
		});
	};

	public passwordChange ( data: any ) : Observable<Response>
	{
		return this.http.post( environment.dsUrl + environment.apiPasswordChange + this._as.getToken(), data ).map(res => res.json());
	}

	public register ( data: {[key:string]:any} ) : Observable<any>
	{
		return this.http.post(this._dsUrl,data);
	} 

	public saveAvantar ( img: string ) : Observable<any>
	{
		let data: any = { 'avatar': img, 'user_id': this._as.getToken() }
		return this.http.post(this._dsUrl + '/api/user/avatar', data);
	}
}