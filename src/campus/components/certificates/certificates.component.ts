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

        if ( this._cs.subject.getValue().length <= 0 )
        {
            this._cs.load();
        }
	}
	
	public ngOnDestroy () : void 
    { 
        this._subscriptions.forEach( sub => sub.unsubscribe());
        this._subscriptions.length = 0;
    }

    private subscribeCourses () : Subscription
    {
        return this._cs.courses.subscribe( certificates => this._certificates = certificates );
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