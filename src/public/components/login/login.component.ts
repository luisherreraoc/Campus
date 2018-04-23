// -- Angular imports -----------------------------------------------------------------------------------------
import { Component, OnInit }                         							from '@angular/core';
import { AbstractControl, FormGroup }        									from '@angular/forms';
import { Observable, BehaviorSubject, Subscription } 							from "rxjs/Rx"; 
import { Http, Response, Headers, RequestOptions } 								from '@angular/http';
import { Router } 																from '@angular/router';

import { Logger, MkFormService, MkForm }										from 'mk';
		


@Component({
	templateUrl: './login.component.html'
})
export class LoginComponent
{
	private _form: MkForm;
	private _form_group: FormGroup;
	private _subscriptions: Array<any>;

	public constructor ( private _logger: Logger, private _fs: MkFormService, private _http: Http, private _router: Router ) 
	{ 
		_logger.log('LOGIN COMPONENT'); 

		this._form_group = new FormGroup({});
  		this._subscriptions = new Array();
	}

	public ngOnInit () : void
	{
		this._subscriptions = [
            this.subscribeQuestionForm()
        ];
	}
	
	public ngOnDestroy () : void 
    { 
        this._subscriptions.forEach( sub => sub.unsubscribe());
        this._subscriptions.length = 0;
    }

    private subscribeQuestionForm () : Subscription
    {
        return this._fs.forms
        .map( forms => forms.find( form => form.name === "login" ) )
        .subscribe( form =>
        {
        	debugger
            if (form) 
            { 
                this._form = form; 
                this._form_group = this._form.formGroup;
            }
        });
    }

    private send () : void
    {
    	let obj: any = this._form_group.getRawValue();

    	obj.product_id = 0;
    	obj.grant_type = 'password';

    	this._http.post( 'http://sso-test.oceano.com/sso/login?', obj )
    	.subscribe( ( response: Response ) =>
    	{
    		let res: any = response.json();
    		this._router.navigateByUrl('/public');
    	});
    }
}