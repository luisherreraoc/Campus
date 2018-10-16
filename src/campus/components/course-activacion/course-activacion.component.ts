import { Component, Inject, ViewContainerRef, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from "rxjs/Rx";
import { AbstractControl, FormGroup } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';

import { Logger, MkFormService, MkForm } from 'mk';      

import { UserService } from '../../services/user.service';

@Component({
    selector: 'course-activacion',
    templateUrl: 'course-activacion.component.html',
    styleUrls: ['course-activacion.component.scss']
})
export class CourseActivacionComponent 
{

    // @ViewChild('button') private _button: ElementRef;
    @Output() close = new EventEmitter<boolean>();
    @Input('course') set course ( c: any )
	{
		this._id = c.id;
		this._title = c.name;
		this._img = this._suite + '/' + c.multimidia.default_image;
		this._redirect = c.url_access;
		this._code = c.license ? c.license.code : null;
		this._state = c.license ? c.license.status : null;
		this._entidad_id = c.certifying_entity ? c.certifying_entity.ce_id : null;
	}

	private _suite: string;

	private _id: number|string;
	private _title: string;
	private _img: string;
	private _redirect: string;
	private	_code: string;
	private _state: string;
	private _ids: any;
	private _entidad_id : any;

    private _form_name : any;
    private _user_previous_info : any;

    private _form: MkForm;
    private _form_group: FormGroup;
    private _subscriptions: Array<any>

    constructor( 
        private _fs: MkFormService, 
        private _http: Http, 
        private _router: Router, 
        private _us: UserService
    ) 
    {
        this._form_group = new FormGroup({});
        this._subscriptions = new Array();        
    }

    public ngOnInit ()
	{
        this._us.getUserData(this._code)
		.subscribe( info => {
			this._user_previous_info = info;
        })

        this._form_name = "course_entidad_" + this._entidad_id + "_default";
        
		this._subscriptions = [
            this.subscribeQuestionForm()
        ];
    }

	// public ngOnDestroy () : void 
    // { 
    //     this._subscriptions.forEach( sub => {
    //         sub.unsubscribe()
    //     });
    //     this._subscriptions.length = 0;
    // }

    private subscribeQuestionForm () : Subscription
    {
        return this._fs.forms
        .map( forms => forms.find( form => form.name === this._form_name ) )
        .subscribe( form =>
        {
            if (form) 
            { 
                this._form = form; 
                this._form_group = this._form.formGroup;

                this._form_group.patchValue(this._user_previous_info);            
            }
        });
    }

    // private falseClick() {
    //     let clickMe = this._button.nativeElement;

    //     clickMe.click();
    // }

    // private next () : void
    // {
    //     let aux: any;
    //     let data: any;

    //     aux = this._form_group.getRawValue();
    //     data = {
    //         'nombre': aux.nombre,
    //         'apellido1': aux.apellido1,
    //         'apellido2': aux.apellido2,
    //         'dni_nie': aux.dni_nie,
    //         'direccion': aux.direccion,
    //         'pais_nombre': aux.pais_nombre,
    //         'mail': aux.mail,
    //         'mail2': aux.mail2,
    //         'telefono': aux.telefono,
    //         'file1': aux.file1,
    //         'file': aux.file
    //     };

    //     if (this._form_group.status === 'VALID') {
    //         this.send(data);
    //     }
    // }

    // private send (data: {[key:string]:any}) : void 
    // {

    //     let route = '';

    //     this._id === 1 || this._id === 2 ? route = 'alcala' : route = 'defaultHandler';

    //     this._us.updateBeforeCourse(data, route, this._code)
    //     .subscribe( (response: any ) =>
    //     { 

    //         console.log(response)
    //         console.log(data)
    //     });
    // }
    private send (ans) {
        this.close.emit(ans)
    }

}