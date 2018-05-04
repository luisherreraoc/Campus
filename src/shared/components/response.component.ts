// -- Angular imports -----------------------------------------------------------------------------------------
import { Component, OnInit, Inject, Input }                         			from '@angular/core';
import { AbstractControl, FormGroup }        									from '@angular/forms';
import { Observable, BehaviorSubject, Subscription } 							from "rxjs/Rx"; 
import { Http, Response, Headers, RequestOptions } 								from '@angular/http';
import { Router, ActivatedRoute } 										        from '@angular/router';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA }                             from '@angular/material';

import { Logger, MkFormService, MkForm }										from 'mk';

@Component({
    selector: 'cam-response',
	templateUrl: './response.component.html',
    //styleUrls: ['./response.component.scss']
})
export class ResponseComponent
{
    @Input('title') _title: string;
    @Input('text') _text: string;
    @Input('img') _img: string;
    @Input('btn') _btn: string;
    @Input('form') _name: string;
    @Input('callback') _callback: any;

    private _form: MkForm;
    private _form_group: FormGroup;
    private _subscriptions: Array<any>;

    constructor ( private _logger: Logger, private _fs: MkFormService )
    {
       this._subscriptions = new Array();
    }

    public ngOnInit ()
    {
        if ( this._name )
        {
            this._subscriptions = [
                this.subscribeQuestionForm()
            ];
        }
    }

    public ngOnDestroy () : void
    {
        this._subscriptions.forEach( sub => {
            sub.unsubscribe()
        });
        this._subscriptions.length = 0;
    }

    private subscribeQuestionForm () : Subscription
    {
        return this._fs.forms
        .map( forms => forms.find( form => form.name === this._name ) )
        .subscribe( form =>
        {
            if (form)
            {
                this._form = form;
                this._form_group = this._form.formGroup;
                this._form_group.reset();
            }
        });
    }
}