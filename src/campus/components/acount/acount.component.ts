import { Component, Inject, ViewContainerRef }                         							from '@angular/core';
import { Observable, BehaviorSubject, Subscription } 					from "rxjs/Rx";

import { environment }													from '../../../environments/environment';

import { Logger, MkFormService, MkForm }												from 'mk';			

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { UserJobsDialogComponent } from '../dialogs/user-jobs-dialog.component';

@Component({
	templateUrl: './acount.component.html',
	styleUrls: ['./acount.component.scss']
})
export class AcountComponent
{
	private _form: MkForm;
	private _subscriptions: Array<Subscription>;

	private _onl1: Array<string>;
	private _onl2: Array<string>;
	private _key: string;

	private _ids: any;

	public constructor ( private logger: Logger, private _fs: MkFormService, private _dialog: MatDialog, private _vcr: ViewContainerRef ) 
	{ 
		logger.log('ACOUNT COMPONENT'); 
		this._onl1 = ['user_first_name', 'user_last_name'];
	 	this._onl2 = ['user_prefix', 'user_telefono'];
	 	this._key = environment.icon_key;

	 	this._ids = {'user':'154'};
	}

	public ngOnInit () : void
	{
		this._subscriptions = [	
			this.subscribeQuestionForm()
		];
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
        .map( forms => forms.find( form => form.name === "user" ))
        .subscribe( form =>
        {
            if (form) 
            { 
                this._form = form;
            }
        });
    }

    private openDialog () : void
    {
    	let dialogRef = this._dialog.open(UserJobsDialogComponent, {
    		//ariaDescribedBy: 'ariaDescribedBy',
    		//ariaLabel: 'ariaLabel',
    		//hasBackdrop: false,
    		id: 'user-jobs-dialog',
    		panelClass: 'custom-dialog',
    		//backdropClass: 'backdropClass',
    		viewContainerRef: this._vcr,
			width: '1200px',
      		data: { ids: this._ids, ref: this._vcr }
    	});
    }
}

