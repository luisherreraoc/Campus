import { Component, ViewChild, ViewContainerRef }                         				from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } 						from '@angular/router';

import { Observable, BehaviorSubject, Subscription } 					from "rxjs/Rx";

import { Logger, Loader }												from 'mk';

import { environment }													from '../../../environments/environment';		

import { CropperComponent }												from '../cropper/cropper.component';
	
import { UserService }													from '../../services/user.service';

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

	public constructor ( private _logger: Logger, private _loader: Loader, private _dialog: MatDialog, private _vcr: ViewContainerRef, private _us: UserService ) 
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
		.takeUntil(dialogRef.afterClosed())
		.subscribe( ( me ) => 
		{
			let d: MatDialogRef<any> = dialogRef;
			let c: string = d.componentInstance.cropped;
			this._img.nativeElement.src = c;
			this._input.nativeElement.value = '';
			this.saveAvatar(c);
		});
	}

	private openDialog ( image: any ) : void
    {
    	let dialogRef = this._dialog.open( CropperComponent, 
    	{
    		id: 'user-avatar-cropper-dialog',
    		viewContainerRef: this._vcr,
      		data: { img: image, rep: this._img }
    	});
    	this.subscribeDialogClosed( dialogRef );
    	
    }

    private saveAvatar ( img: string ) : void
    {
    	this._loader.show('avatar');
    	this._us.saveAvantar(img)
    	.subscribe( ( resp: any ) =>
    	{
    		this._loader.dismiss('avatar');
    		debugger
    	});
    }
}