import { Inject, Injectable, Optional }					from '@angular/core';
import { Response, Http } 								from "@angular/http";
import { Observable, BehaviorSubject } 					from "rxjs/Rx"; 

import { DataServiceInterface }							from 'mk';
import { DataService }									from 'mk';

import { Logger }										from 'mk';
import { Loader }										from 'mk';

import { User, UserInterface }				    		from '../models/user.model';

export class UserService extends DataService<User>
{

	public constructor ( 
		private http: Http, 
		private loader: Loader, 
		private logger: Logger )
	{
		super(User, logger, loader);
	}


	public getById ( id: number|string ) : Observable<Response> 
	{
		console.log("GETBYID");
		return this.http.get('./mocks/user.json');
	};
}