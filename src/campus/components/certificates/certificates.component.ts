import { Component }                         							from '@angular/core';
import { Observable, BehaviorSubject, Subscription } 					from "rxjs/Rx"; 
import { Logger, Loader }														from 'mk';
import { CoursesService }												from '../../services/courses.service';

@Component({
	templateUrl: './certificates.component.html',
	styleUrls: ['./certificates.component.scss']
})
export class CertificatesComponent
{
	private _subscriptions: Array<any>;
	private _certificates: Array<any>;
    private _showRequest: boolean;

	public constructor ( private logger: Logger, private loader: Loader, private _cs: CoursesService ) 
	{ 
		logger.log('CERTIFICATES COMPONENT'); 
		this._subscriptions = new Array();
        this._showRequest = false;
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
                this._certificates = resp.data;
    		}
    		else
    		{
    			this.logger.error('Error: ' + resp.message);
			}
		},
		(error: any) => {console.log('error')}
		);
    }

    private showRequest ( code: string ) : void
    {
        this._showRequest = true;
    }    

    private closeRequest () : void 
    {
        this._showRequest = false;
    }
}