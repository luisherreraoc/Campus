import { Component, Inject, ViewContainerRef } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from "rxjs/Rx";
import { AbstractControl, FormGroup } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';

import { Logger, MkFormService, MkForm } from 'mk';      

import { UserService } from '../../services/user.service';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormErrorDialog } from './form-error-dialog.component';


@Component({
    selector: 'user-info-dialog',
    templateUrl: 'user-info-dialog.component.html',
    styleUrls: ['user-info-dialog.component.css']
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
        .map( forms => forms.find( form => form.name === this.data._form ) )
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
            'nombre': aux.nombre,
            'apellido1': aux.apellido1,
            'apellido2': aux.apellido2,
            'dni_nie': aux.dni_nie,
            'direccion': aux.direccion,
            'pais_nombre': aux.pais_nombre,
            'mail': aux.mail,
            'mail2': aux.mail2,
            'telefono': aux.telefono,
            'file1': aux.file1,
            'file': aux.file
        };

        if (this._form_group.status === 'VALID') {
            this.send(data);
        } else {
            let dialogRef = this._dialog.open(FormErrorDialog, {
				id: 'form-error-dialog',
				data: {
                    message: 'Por favor, revise los campos introducidos'
				},
			});
        };

    }

    private send (data: {[key:string]:any}) : void 
    {
        this._us.update(data)
        .subscribe( (response: any ) =>
        { 
            if (response.code === 200) {
                this.dialogRef.close();
                this.dialogRef.afterClosed()
                .subscribe( x => {
                    window.open(environment.ssoRedirectUrl + this.data._code);         
                });
            } else {
                let dialogRef = this._dialog.open(FormErrorDialog, {
                    id: 'form-error-dialog',
                    data: {
                        message: 'Ha habido un error, por favor, vuelva a intentarlo'
                    },
                });
            };
            console.log(response)
            console.log(data)
        });
    }

}