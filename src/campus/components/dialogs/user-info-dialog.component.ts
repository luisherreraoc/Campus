import { Component, Inject, ViewContainerRef } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from "rxjs/Rx";
import { AbstractControl, FormGroup } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';

import { Logger, MkFormService, MkForm } from 'mk';      

import { UserService } from '../../services/user.service';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
    selector: 'user-info-dialog',
    templateUrl: 'user-info-dialog.component.html'
})
export class UserInfoDialog 
{

    private _form: MkForm;
    private _form_group: FormGroup;
    private _subscriptions: Array<any>
    private _ids: any;

    constructor( 
        public dialogRef: MatDialogRef<UserInfoDialog>, 
        @Inject(MAT_DIALOG_DATA) 
        public data: any,
        private _fs: MkFormService, 
        private _http: Http, 
        private _router: Router, 
        private _us: UserService,
        private _dialog: MatDialog 
    ) 
    {
        this._form_group = new FormGroup({});
        this._subscriptions = new Array();        
    }

    public ngOnInit ()
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
        .map( forms => forms.find( form => form.name === "course" ) )
        .subscribe( form =>
        {
            if (form) 
            { 
                this._form = form; 
                this._form_group = this._form.formGroup;                
            }
        });
    }

    private next () : void
    {
        let aux: any;
        let data: any;

        aux = this._form_group.getRawValue();
        data = {
            'user_first_name': aux.user_first_name,
            'user_last_name': aux.user_last_name,
            'user_dni': aux.user_dni,
            'user_address': aux.user_address,
            'user_country': aux.user_country,
            'user_email': aux.user_email,
            'user_telefono': aux.user_telefono
        }
        this.send(data);
        this.dialogRef.close();
        
    }

    private send (data: {[key:string]:any}) : void 
    {
        this._us.register(data)
        .subscribe( (response: any ) =>
        { 
            console.log(data) 
        });
    }

}