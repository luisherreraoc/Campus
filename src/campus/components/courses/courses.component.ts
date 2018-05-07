import { Component }                         							from '@angular/core';
import { Observable, BehaviorSubject, Subscription } 					from "rxjs/Rx"; 

import { Logger }														from 'mk';

import { CoursesService }												from '../../services/courses.service';			

@Component({
	templateUrl: './courses.component.html',
	styleUrls: ['./courses.component.scss']
})
export class CoursesComponent
{
	private _subscriptions: Array<any>;
	private _courses: Array<any>;

	public constructor ( private logger: Logger, private _cs: CoursesService ) 
	{ 
		logger.log('COURSES COMPONENT'); 
		this._subscriptions = new Array();
	}

	public ngOnInit () : void
	{
		debugger
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
    	debugger
    	return this._cs.list({})
    	.subscribe( (resp: any) =>
    	{
    		if ( resp.status === 200 )
    		{

    		}
    		else
    		{
    			this.logger.error('Error: ' + resp.message);
    		}
    	});

    }
}