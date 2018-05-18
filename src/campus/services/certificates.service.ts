import { Inject, Injectable, Optional }					from '@angular/core';
import { Response, Http } 								from "@angular/http";
import { Observable, BehaviorSubject } 					from "rxjs/Rx"; 

import { environment }									from '../../environments/environment';

export class CertificatesService 
{

	private _dsUrl: string = environment.dsUrl;

	public constructor (private http: Http)
	{

    }

	public register ( data: {[key:string]:any} ) : Observable<any>
	{
        console.log(data);
		return this.http.post(this._dsUrl,data);
	} 
}