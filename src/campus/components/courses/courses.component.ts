import { Component }                         							from '@angular/core';
import { Observable, BehaviorSubject, Subscription } 					from "rxjs/Rx"; 

import { Logger, Loader }														from 'mk';

import { CoursesService }												from '../../services/courses.service';			

@Component({
	templateUrl: './courses.component.html',
	styleUrls: ['./courses.component.scss']
})
export class CoursesComponent
{
	private _subscriptions: Array<any>;
	private _courses: Array<any>;

	public constructor ( private logger: Logger, private _cs: CoursesService, private loader: Loader ) 
	{ 
		logger.log('COURSES COMPONENT'); 
		this._subscriptions = new Array();
	}

	public ngOnInit () : void
	{
		this._subscriptions = [
            this.subscribeCourses()
        ];
	}
	
	public ngOnDestroy () : void 
    { 
        this._subscriptions.forEach( sub => sub.unsubscribe());
        this._subscriptions.length = 0;
    }

    private subscribeCourses () : Subscription
    {
    	return this._cs.list({})
    	.subscribe( (resp: any) =>
    	{
    		if ( resp.status === 200 )
    		{
                this._courses = resp.data;
    		}
    		else
    		{
    			this.logger.error('Error: ' + resp.message);
			}
		}, 		
		(error: any) => { console.log(error)}
		);
    }
}