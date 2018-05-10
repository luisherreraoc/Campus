import { Component, Inject }                                      from '@angular/core';
import { Observable, BehaviorSubject, Subscription }                from "rxjs/Rx";

import { environment }                                              from '../../../environments/environment';

import { Logger, MkFormService, MkForm }                        from 'mk';      

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'user-jobs-dialog',
    templateUrl: 'user-jobs-dialog.component.html',
    styleUrls: ['user-jobs-dialog.component.css']
})
export class UserJobsDialogComponent 
{

    firstMenu = true;
    secondMenu = false;

    private _onl1: Array<string>;
    private _onl2: Array<string>;
    private _onl3: Array<string>;


    constructor( public dialogRef: MatDialogRef<UserJobsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) 
    { 
        this._onl1 = ['user_job'];
        this._onl2 = ['user_especialization'];
        this._onl3 = ['user_college'];
    }

    onNoClick(): void 
    {
        debugger
        this.dialogRef.close();
    }

    public next () : void
    {
        this.firstMenu = false;
        this.secondMenu = true;
    }

    public previous () : void
    {
        this.firstMenu = true;
        this.secondMenu = false;
    }
}