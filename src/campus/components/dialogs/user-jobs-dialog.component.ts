import { Component, Inject, ViewContainerRef } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from "rxjs/Rx";

import { environment } from '../../../environments/environment';

import { Logger, MkFormService, MkForm } from 'mk';      

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'user-jobs-dialog',
    templateUrl: 'user-jobs-dialog.component.html',
    styleUrls: ['user-jobs-dialog.component.css']
})
export class UserJobsDialogComponent 
{
    private _onl1: Array<string>;

    private _ids: any;


    constructor(
        public dialogRef: MatDialogRef<UserJobsDialogComponent>, 
        @Inject(MAT_DIALOG_DATA) 
        public data: any ) 
    { 
        this._onl1 = ['user_job'];
    }

    hideDialog () : void 
    {
        this.dialogRef.close();
        // junto con el close pasar la información seleccionada en el form al parent 
    }
    
}