import { Component }                         							from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } 						from '@angular/router';

import { Observable, BehaviorSubject, Subscription } 					from "rxjs/Rx";

import { Logger }														from 'mk';

import { environment }													from '../../../environments/environment';		

@Component({
	templateUrl: './campus.component.html',
	styleUrls: ['./campus.component.scss']
})
export class CampusComponent
{
	private _subscriptions: Array<Subscription>;
	private _courses: string;
	private _certificates: string;
	private _acount: string;

	private _outer_class: string;

	public constructor ( private _logger: Logger, private _router: Router, private _route: ActivatedRoute ) 
	{ 
		this._logger.log('CAMPUS COMPONENT'); 
		this._acount =  new Array(environment.pathCampus,environment.pathAcount).join('/');
		this._courses = new Array(environment.pathCampus,environment.pathCourses).join('/');
		this._certificates = new Array(environment.pathCampus,environment.pathCertificates).join('/');
		this._subscriptions = new Array();
		this._outer_class = '';
	}

	public ngOnInit () : void
	{
		this._outer_class = this.getSegment();
		this._subscriptions = [	
			this.subscribeRouterEvents()
		];
	}

	public ngOnDestroy () : void 
    { 
        this._subscriptions.forEach( sub => {
            sub.unsubscribe()
        });
        this._subscriptions.length = 0;
    }

	private getSegment () : string
	{
		let reg: any = new RegExp('\/.*\/(.*)|\/?');
		let segment = this._router.url;
		let res: any = reg.exec(segment);
		return res[1];
	}

	private subscribeRouterEvents () : Subscription
	{
		return this._router.events
  		.filter((event) => event instanceof NavigationEnd)
  		.map(() => this._route)
  		.subscribe((event) => {
			this._outer_class = this.getSegment();
  		});
	}
}