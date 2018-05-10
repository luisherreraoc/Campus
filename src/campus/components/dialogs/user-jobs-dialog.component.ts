import { Component, Inject, ViewContainerRef } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from "rxjs/Rx";

import { environment } from '../../../environments/environment';

import { Logger, MkFormService, MkForm } from 'mk';      

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { UserEspColDialogComponent } from '../dialogs/user-esp-col-dialog.component';

@Component({
    selector: 'user-jobs-dialog',
    templateUrl: 'user-jobs-dialog.component.html',
    styleUrls: ['user-jobs-dialog.component.css']
})
export class UserJobsDialogComponent 
{

    private showFirst = true;

    private _onl1: Array<string>;

    private _ids: any;


    constructor(
        public dialogRef: MatDialogRef<UserJobsDialogComponent>, 
        @Inject(MAT_DIALOG_DATA) 
        public data: any,  
        private _dialog: MatDialog, 
        private _vcr: ViewContainerRef ) 
    { 
        this._onl1 = ['user_job'];
    }

    hideDialog () : void 
    {
        this.showFirst = false;
    }

    private openDialog () : void
    {
    	let dialogRef = this._dialog.open(UserEspColDialogComponent, {

    		id: 'user-esp-col-dialog',
    		panelClass: 'custom-dialog',
    		viewContainerRef: this._vcr,
			width: '1200px',
      		data: { ids: this._ids, ref: this._vcr },
    	});
    }
}