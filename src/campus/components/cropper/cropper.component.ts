import { Component, ViewChild, Inject }                         		from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } 						from '@angular/router';

import { Observable, BehaviorSubject, Subscription } 					from "rxjs/Rx";

import { Logger }														from 'mk';

import { environment }													from '../../../environments/environment';		

// --- Img Cropp --------------------------------------------------------------
import { ImageCropperComponent, CropperSettings } 						from "ngx-img-cropper";

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA}                 		from '@angular/material';

@Component({
	selector: 'cropper',
	templateUrl: './cropper.component.html',
	styleUrls: ['./cropper.component.scss'],
})
export class CropperComponent
{
	@ViewChild('input', undefined) _input:any;
	@ViewChild('cropper', undefined) _cropper:ImageCropperComponent;

   	public _data: any;
   	public cropped: any;

    private _cropperSettings: CropperSettings;
    private _subscriptions: Array<Subscription>;

	public constructor ( private _logger: Logger, public dialogRef: MatDialogRef<CropperComponent>, @Inject(MAT_DIALOG_DATA) public data: any ) 
	{ 
		this._logger.log('CROPPER  COMPONENT'); 

		this._subscriptions = new Array();

		// Cropper 
		this._cropperSettings = new CropperSettings();
	    this._cropperSettings.width = 160;
	    this._cropperSettings.height = 160;
	    this._cropperSettings.croppedWidth = 160;
	    this._cropperSettings.croppedHeight = 160;
	    this._cropperSettings.canvasWidth = 400;
	    this._cropperSettings.canvasHeight = 300;
	 	this._cropperSettings.noFileInput = true;
	 	this._cropperSettings.rounded = true;
	 	this._cropperSettings.showCenterMarker = false;

	    this._data = {};
	}

	public ngOnInit () : void
	{
		debugger
		this._subscriptions = [];

		setTimeout( () => {
			this._cropper.setImage(this.data.img);
		},100);
	}

	public ngOnDestroy () : void 
    { 
        this._subscriptions.forEach( sub => {
            sub.unsubscribe()
        });
        this._subscriptions.length = 0;
    }

    private onLoad ( img: any ) : void
    {
    	debugger
    	this.cropped = img;
    }

}