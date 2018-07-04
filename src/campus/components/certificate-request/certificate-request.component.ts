import { Component, Input, Output, EventEmitter, ViewChild, ElementRef }                         					from '@angular/core';

import { Logger, MkFormService, MkForm }														from 'mk';
import { Router, ActivatedRoute } 																from '@angular/router';

import { Observable, BehaviorSubject, Subscription } 					from "rxjs/Rx";

import { Producto, ProductoInterface }				    				from '../../models/producto.model';			

import { Http }															from '@angular/http';

import { environment }													from '../../../environments/environment';
import { CertificatesService } from '../../services/certificates.service';
		

@Component({
	selector: 'certificate-request',
	templateUrl: './certificate-request.component.html',
	styleUrls: ['./certificate-request.component.scss']
})
export class CertificateRequestComponent
{
	@ViewChild('button') private _button: ElementRef;	
	@Output ('close') _close: EventEmitter<null> = new EventEmitter<null>()

	private _form: MkForm;
	private _subscriptions: Array<Subscription>;

	public constructor ( private logger: Logger, private _route: ActivatedRoute, private _fs: MkFormService, private _http: Http, private _cfs: CertificatesService ) 
	{ 
		logger.log('CERTIFICATE REQUEST COMPONENT');
	}

	public ngOnInit () : void
	{
		this._subscriptions = [	
			this.subscribeQuestionForm()
		];
	}

	private falseClick() {
        let clickMe = this._button.nativeElement;

        clickMe.click();
    }

	private close () : void
	{
		this._close.emit();
	}

	private send () : void
	{
		let data: any = this._fs.getFormData('certificate-request').formGroup.getRawValue();
		this.logger.log(data);
		this._cfs.register(data);
		this.close();
	}

	 private subscribeQuestionForm () : Subscription
    {
    	return this._fs.forms
        .map( forms => forms.find( form => form.name === 'certificate-request' ))
        .subscribe( form =>
        {
            if (form) 
            { 
                this._form = form;
            }
        });
    }
}