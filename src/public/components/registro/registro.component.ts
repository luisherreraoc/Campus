// -- Angular imports -----------------------------------------------------------------------------------------
import { Component, OnInit }                         							from '@angular/core';
import { AbstractControl, FormGroup }        									from '@angular/forms';
import { Observable, BehaviorSubject, Subscription } 							from "rxjs/Rx"; 
import { Http, Response, Headers, RequestOptions } 								from '@angular/http';
import { Router } 																from '@angular/router';

import { Logger, MkFormService, MkForm }										from 'mk';	

import { RegistroService }                                                      from './registro.service';

const especialidad = {
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
	templateUrl: './registro.component.html',
    styleUrls: ['./registro.component.scss']
})
export class RegistroComponent
{
    private _step: number;
    private _steps: Array<Array<string>>;
    private _showIngresar: boolean;
	private _butonLabel: string;
    private _form: MkForm;
	private _form_group: FormGroup;
	private _subscriptions: Array<any>;
    private ids: any;

	public constructor ( private _logger: Logger, private _fs: MkFormService, private _http: Http, private _router: Router, private rs: RegistroService ) 
	{ 
		_logger.log('REGISTRO COMPONENT'); 

        this._step = 0;
        this._steps = [
            new Array("registro_first_name", "registro_last_name", "registro_email", "registro_password", "registro_password2", "lead_status"),
            new Array("registro_job"),
            new Array(),
            new Array("registro_collage"),
            new Array("registro_first_name", "registro_email", "registro_password", "registro_especializacion_2", "registro_collage_2")
        ];
        this._showIngresar = true;
        this._butonLabel = 'SIGUIENTE';
		this._form_group = new FormGroup({});
  		this._subscriptions = new Array();

        //this.ids = { 'registro': [0] };
        this._fs.addServices(rs);
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
        .map( forms => forms.find( form => form.name === "registro" ) )
        .subscribe( form =>
        {
            if (form) 
            { 
                this._form = form; 
                this._form_group = this._form.formGroup;
            }
        });
    }

    private nextStep () : void
    {
        if ( this._step >= this._steps.length - 1 )
        {
            debugger
        }
        else
        {
            this._step++;
        }
    }

}