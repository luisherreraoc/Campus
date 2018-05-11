import { Component, Inject } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from "rxjs/Rx";

import { environment } from '../../../environments/environment';

import { Logger, MkFormService, MkForm } from 'mk';      

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'user-esp-col-dialog',
    templateUrl: 'user-esp-col-dialog.component.html',
    styleUrls: ['user-esp-col-dialog.component.css']
})
export class UserEspColDialogComponent

{

    private _onl2: Array<string>;
    private _onl3: Array<string>;


    constructor( 
        public dialogRef: MatDialog, 
        @Inject(MAT_DIALOG_DATA) 
        public data: any ) 
    { 
        this._onl2 = ['user_especialization'];
        this._onl3 = ['user_college'];
    }

    public next () : void
    {
        this.dialogRef.closeAll();
    }

}