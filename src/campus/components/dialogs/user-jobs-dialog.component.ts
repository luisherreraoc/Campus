import { Component, Inject }                                      from '@angular/core';
import { Observable, BehaviorSubject, Subscription }                from "rxjs/Rx";

import { environment }                                              from '../../../environments/environment';

import { Logger, MkFormService, MkForm }                        from 'mk';      

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA}                 from '@angular/material';

@Component({
    selector: 'user-jobs-dialog',
    template: `
        <mk-form name="user" ids="data.ids" [only]="_only"></mk-form>
        <button _ngcontent-c3="" class="btn" (click)="next()">SIGUIENTE</button>
    `
})
export class UserJobsDialogComponent 
{

    private _only: Array<string>;

    constructor( public dialogRef: MatDialogRef<UserJobsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) 
    { 
        this._only = ['user_job'];
    }

    onNoClick(): void 
    {
        debugger
        this.dialogRef.close();
    }

    public next () : void
    {
        debugger
    }
}