import { Component, Inject, ViewContainerRef } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from "rxjs/Rx";

import { environment } from '../../../environments/environment';

import { Logger, MkFormService, MkForm } from 'mk';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { UserJobsDialogComponent } from '../dialogs/user-jobs-dialog.component';
import { UserEspColDialogComponent } from '../dialogs/user-esp-col-dialog.component';

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
      		data: { 
				ids: this._ids, 
				ref: this._vcr 
			}
		});
		this._subscriptions.push(this.subscribeDialogClose(dialogRef));
	}

	private openSecondDialog() : void
    {
		// let job:any = this._form.find('user_job').value || 'Médico';

		// this._fs.getFormQuestions('registro').map( (q:any) =>
		// {
		// 	if(q.key == 'user_especialization')
		// 	{
		// 		q.options = especialidad[job];

		// 	}
		// });

    	let dialogRef = this._dialog.open(UserEspColDialogComponent, {
    		id: 'user-esp-col-dialog',
    		panelClass: 'custom-dialog',
			viewContainerRef: this._vcr,
      		data: { 
				ids: this._ids, 
				ref: this._vcr 
				// pasar la info recuperada arriba como data
			}
		});
	}
	
	private subscribeDialogClose (dialogRef: any) : Subscription 
	{
		return dialogRef.afterClosed()
			.subscribe(resp => { 
				this.openSecondDialog() 
			});
	}

}

