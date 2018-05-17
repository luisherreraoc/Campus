import { Component, ViewChild, ViewContainerRef }                         				from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } 						from '@angular/router';

import { Observable, BehaviorSubject, Subscription } 					from "rxjs/Rx";

import { Logger }														from 'mk';

import { environment }													from '../../../environments/environment';		

import { CropperComponent }												from '../cropper/cropper.component';
	
import { UserService }													from '../../services/user.service';

// --- Img Cropp --------------------------------------------------------------
import { ImageCropperComponent, CropperSettings } 						from "ngx-img-cropper";

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } 					from '@angular/material';

@Component({
	selector: 'user-avatar',
	templateUrl: './avatar.component.html',
	styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent
{
	@ViewChild('img', undefined) _img:any;
	@ViewChild('input', undefined) _input:any;
	@ViewChild('button', undefined) _button:any;

	private _subscriptions: Array<Subscription>;

	public constructor ( private _logger: Logger, private _dialog: MatDialog, private _vcr: ViewContainerRef, private _us: UserService ) 
	{ 
		_logger.log('Avatar Component');
	}

	public ngOnInit () : void
	{
		this._subscriptions = [
			this.subscribeFileChange(),
			this.subscribeButtonClick()
		];
	}

	public ngOnDestroy () : void 
    { 
        this._subscriptions.forEach( sub => {
            sub.unsubscribe()
        });
        this._subscriptions.length = 0;
    }

    private subscribeFileChange () : Subscription
    {
    	return Observable.fromEvent(this._input.nativeElement, 'change')
    	.subscribe( (ev:any) =>
    	{
    		let img: any = new Image();
    		let file: File = ev.target.files[0];
    		let reader: FileReader = new FileReader();
    		let that = this;
    		let valid = ["image/gif", "image/jpeg", "image/png"];

	    	if ( valid.indexOf( file['type'] ) >= 0 )
	    	{
	    		reader.onloadend = ( loadEvent: any ) =>
	    		{
	    			img.src = loadEvent.target.result;
	    			that.openDialog(img);
	    		}
	    		reader.readAsDataURL(file);
	    	}
    	});
    }
	
	private subscribeButtonClick () : Subscription
	{
		return Observable.fromEvent(this._button.nativeElement, 'click')
		.subscribe( (event: any) =>
		{
			this._input.nativeElement.click();
		});
	}

	private subscribeDialogClosed ( dialogRef: MatDialogRef<any> ) : Subscription
	{
		return dialogRef.beforeClose()
		.subscribe( ( me ) => 
		{
			//let dial: MatDialog = this._dialog;
			let d: MatDialogRef<any> = dialogRef;
			
			// Esto no esta muy bonito,queda para arreglar -----
			let len: number = this._subscriptions.length - 1;
			this._subscriptions[len].unsubscribe();
			this._subscriptions.pop();
			// -------------------------------------------------

			let cropped = d.componentInstance.cropped;

			this._img.nativeElement.src = cropped;


		});
	}

	private openDialog ( image: any ) : void
    {
    	let dialogRef = this._dialog.open( CropperComponent, {
    		id: 'user-avatar-cropper-dialog',
    		viewContainerRef: this._vcr,
      		data: { img: image, rep: this._img }
    	});

    	this._subscriptions.push( this.subscribeDialogClosed( dialogRef ) );
    }
}