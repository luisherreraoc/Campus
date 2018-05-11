import { Component, Inject, ViewContainerRef } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from "rxjs/Rx";

import { environment } from '../../../environments/environment';

import { Logger, MkFormService, MkForm } from 'mk';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { UserJobsDialogComponent } from '../dialogs/user-jobs-dialog.component';
import { UserEspColDialogComponent } from '../dialogs/user-esp-col-dialog.component';

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

	public constructor ( 
		private logger: Logger, 
		private _fs: MkFormService, 
		private _dialog: MatDialog, 
		private _vcr: ViewContainerRef ) 
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

    private openFirstDialog() : void
    {
    	let dialogRef = this._dialog.open(UserJobsDialogComponent, {
    		id: 'user-jobs-dialog',
    		panelClass: 'custom-dialog',
			viewContainerRef: this._vcr,
			width: '700px',
      		data: { ids: this._ids, ref: this._vcr }
		});
		this._subscriptions.push(this.subscribeDialogClose(dialogRef));
	}

	private openSecondDialog() : void
    {
    	let dialogRef = this._dialog.open(UserEspColDialogComponent, {
    		id: 'user-esp-col-dialog',
    		panelClass: 'custom-dialog',
			viewContainerRef: this._vcr,
      		data: { ids: this._ids, ref: this._vcr }
		});
	}
	
	private subscribeDialogClose (dialogRef: any) : Subscription 
	{
		return dialogRef.afterClosed().subscribe(resp => { this.openSecondDialog() });

	}

}

