import { Component, Inject, ViewContainerRef, ViewChild, ElementRef, Output } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from "rxjs/Rx";
import { AbstractControl, FormGroup } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';

import { Logger, MkFormService, MkForm } from 'mk';      

import { UserService } from '../../services/user.service';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA}                 from '@angular/material';

const especialidad: any = {
    "Médico": [
        { "value":"Alergia e Inmunología Clínica", "text": " Alergia e Inmunología Clínica"},
        { "value":"Anestesiología", "text": " Anestesiología"},
        { "value":"Auditoría Médica", "text": " Auditoría Médica"},
        { "value":"Cardiología", "text": " Cardiología"},
        { "value":"Cirugía", "text": " Cirugía"},
        { "value":"Dermatología", "text": " Dermatología"},
        { "value":"Diagnostico por Imágenes", "text": " Diagnostico por Imágenes"},
        { "value":"Emergentología", "text": " Emergentología"},
        { "value":"Endocrinología", "text": " Endocrinología"},
        { "value":"Farmacologia Clinica", "text": " Farmacologia Clinica"},
        { "value":"Gastroterología", "text": " Gastroterología"},
        { "value":"Geriatría y gerontología", "text": " Geriatría y gerontología"},
        { "value":"Ginecología", "text": " Ginecología"},
        { "value":"Hematología", "text": " Hematología"},
        { "value":"Hemoterapia e Inmunohematologia", "text": " Hemoterapia e Inmunohematologia"},
        { "value":"Hepatología", "text": " Hepatología"},
        { "value":"Infectologia", "text": " Infectologia"},
        { "value":"Mastología", "text": " Mastología"},
        { "value":"Medicina Crítica y Terapia Intensiva", "text": " Medicina Crítica y Terapia Intensiva"},
        { "value":"Medicina del Deporte", "text": " Medicina del Deporte"},
        { "value":"Medicina del Trabajo", "text": " Medicina del Trabajo"},
        { "value":"Medicina Estética", "text": " Medicina Estética"},
        { "value":"Medicina Familiar", "text": " Medicina Familiar"},
        { "value":"Medicina Física y Rehabilitación", "text": " Medicina Física y Rehabilitación"},
        { "value":"Medicina Interna", "text": " Medicina Interna"},
        { "value":"Medicina Reproductiva", "text": " Medicina Reproductiva"},
        { "value":"Nefrología y Medio Interno", "text": " Nefrología y Medio Interno"},
        { "value":"Neonatología", "text": " Neonatología"},
        { "value":"Neumonología", "text": " Neumonología"},
        { "value":"Neurocirugía", "text": " Neurocirugía"},
        { "value":"Neurología", "text": " Neurología"},
        { "value":"Nutrición", "text": " Nutrición"},
        { "value":"Obstetricia", "text": " Obstetricia"},
        { "value":"Oftalmología", "text": " Oftalmología"},
        { "value":"Oncología", "text": " Oncología"},
        { "value":"Ortopedia y Traumatología", "text": " Ortopedia y Traumatología"},
        { "value":"Osteopatias Médicas", "text": " Osteopatias Médicas"},
        { "value":"Otorrinolaringología", "text": " Otorrinolaringología"},
        { "value":"Patología", "text": " Patología"},
        { "value":"Pediatría", "text": " Pediatría"},
        { "value":"Psiquiatría", "text": " Psiquiatría"},
        { "value":"Radioterapia", "text": " Radioterapia"},
        { "value":"Reumatología", "text": " Reumatología"},
        { "value":"Terapia intensiva", "text": " Terapia intensiva"},
        { "value":"Tocoginecología", "text": " Tocoginecología"},
        { "value":"Toxicología", "text": " Toxicología"},
        { "value":"Urología ", "text": " Urología "}
    ],
    "Licenciado de la salud": [
        { "value":"COSMETOLOGÍA", "text": " COSMETOLOGÍA"},
        { "value":"FONOAUDIOLOGÍA", "text": " FONOAUDIOLOGÍA"},
        { "value":"GERONTOLOGÍA", "text": " GERONTOLOGÍA"},
        { "value":"HEMOTERAPIA E INMUNOHEMATOLOGÍA", "text": " HEMOTERAPIA E INMUNOHEMATOLOGÍA"},
        { "value":"INTRUMENTACIÓN QUIRURGICA", "text": " INTRUMENTACIÓN QUIRURGICA"},
        { "value":"KINESIOLOGÍA Y FISITRÍA", "text": " KINESIOLOGÍA Y FISITRÍA"},
        { "value":"NUTRICIÓN", "text": " NUTRICIÓN"},
        { "value":"OBSTETRICIA ", "text": " OBSTETRICIA "},
        { "value":"PODOLOGÍA", "text": " PODOLOGÍA"},
        { "value":"PRÁCTICAS CARDIOLÓGICAS", "text": " PRÁCTICAS CARDIOLÓGICAS"},
        { "value":"PSICOLOGÍA", "text": " PSICOLOGÍA"},
        { "value":"RADIOLOGÍA", "text": " RADIOLOGÍA"}
    ],
    "Enfermero": [
        { "value":"Cardiología", "text": " Cardiología"},
        { "value":"Cuidados Intensivos", "text": " Cuidados Intensivos"},
        { "value":"Gerontología", "text": " Gerontología"},
        { "value":"Nefrología y Medio Interno", "text": " Nefrología y Medio Interno"},
        { "value":"Neonatología", "text": " Neonatología"},
        { "value":"Oncología", "text": " Oncología"},
        { "value":"Pediatría", "text": " Pediatría"},
        { "value":"Salud Mental", "text": " Salud Mental"}
    ]
};

@Component({
    selector: 'user-jobs-dialog',
    templateUrl: 'user-jobs-dialog.component.html',
    styleUrls: ['user-jobs-dialog.component.css']
})
export class UserJobsDialogComponent 
{
    @ViewChild('button') private _button: ElementRef;

    private firstMenu: boolean;
    private secondMenu: boolean;
    private showMe: boolean;
    private showDialog: boolean;
    private showText: boolean;

    private _step: number;
    private _steps: Array<Array<string>>;

    private _only: Array<string>;

    private _form: MkForm;
    private _form_group: FormGroup;
    private _subscriptions: Array<any>
    private _ids: any;

    private _question: any;

    private test: any;

    constructor( 
        public dialogRef: MatDialogRef<UserJobsDialogComponent>, 
        @Inject(MAT_DIALOG_DATA) 
        public data: any,
        private _fs: MkFormService, 
        private _http: Http, 
        private _router: Router, 
        private _us: UserService,
        private _dialog: MatDialog
    ) 
    {
        this.showMe = true;
        this.showDialog = true;
        this.showText = false;
        
        this._step = 0;
        this._steps = [
            new Array("user_details_job"),
            new Array("user_details_college")
        ];

        this._form_group = new FormGroup({});
        this._subscriptions = new Array();
    }
    
    public ngOnInit ()
	{
		this._subscriptions = [
            this.subscribeQuestionForm()
        ];
        setTimeout(()=> {this.showMe = false}, 1200)
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
        .map( forms => forms.find( form => form.name === "user" ) )
        .subscribe( form =>
        {
            if (form) 
            {
                this._form = form; 
                this._form_group = this._form.formGroup;
            }
        });
    }

    private falseClick() {
        let clickMe = this._button.nativeElement;

        clickMe.click();
    }

    private next () : void
    {
        let aux: any;
        let data: any;
        let len: number = this._steps.length -1;

        if ( this._step < len ) {
            this._step++;
    
            if ( this._step == 1 ) {
                let job : any = this._form.find('user_details_job').value || 'Médico';

                this._fs.getFormQuestions('user').map( (q:any) => {
                    if(q.key == 'user_details_especialization') {
                        
                        q.options = especialidad[ job.value ? job.value : job ];

                        this._question = q;
                    }
                });
            }
        } else {
            aux = this._form_group.getRawValue();
            
            let especializations = [];
            let colleges = [];
            for (let especialization of aux.user_details_especialization) {
                especializations.push(especialization.value);
            };
            for (let college of aux.user_details_college) {
                colleges.push(college.value);
            };
            data = {
                'first_name': aux.oauth_user_first_name,
                'last_name': aux.oauth_user_last_name,
                'phone': aux.oauth_user_phone,
                'details': [
                            {key: 'job', value: aux.user_details_job.value},
                            {key: 'especialization', value: especializations},
                            {key: 'college', value: colleges},
                            {key: 'prefix', value: aux.user_details_prefix}
                        ],
            }
            this.send(data);
        }
    }

    private send (data: {[key:string]:any}) : void 
    {
        this.showDialog = false;
        this.showText = true;
        this._us.update(data)
        .subscribe( (response: any ) =>
        {
            let user : any = this._us.data.find((user : any) => {
                return user.oauth_user_id == this.data.ids.user
            })

            let aux = this._form_group.getRawValue();
            
            let especializations = [];
            let colleges = [];
            for (let especialization of aux.user_details_especialization) {
                especializations.push(especialization.value);
            };
            for (let college of aux.user_details_college) {
                colleges.push(college.value);
            };

            let user_details = [
                {key: 'job', value: aux.user_details_job.value},
                {key: 'especialization', value: especializations},
                {key: 'college', value: colleges},
                {key: 'prefix', value: aux.user_details_prefix}
            ];

            user.oauth_user_first_name = aux.oauth_user_first_name;
            user.oauth_user_last_name = aux.oauth_user_last_name;
            user.oauth_user_phone = aux.oath_user_phone;
            user.oauth_user_details = user_details;
            user.user_details_job = aux.user_details_job.value;
            user.user_details_especialization = especializations
            user.user_details_college = colleges;
            user.user_details_prefix = aux.user_details_prefix;
        },
        ( error : any ) => {
            this.dialogRef.close({error : true});
        },
        () => {
            this.dialogRef.close({sent: true});
        }
        );
    }

}