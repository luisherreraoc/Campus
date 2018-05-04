// -- Angular imports -------------------------------------------------------------------------------------------
import { Component, ViewContainerRef } 													from '@angular/core';

// -- App imports -----------------------------------------------------------------------------------------------
import { Loader, MkFormService }														from 'mk';

@Component({
  	selector: 'app-root',
  	templateUrl: './app.component.html',
  	styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  	private title = 'Campus';

  	constructor ( private _loader: Loader, private _vcr: ViewContainerRef, _fs: MkFormService ) 
  	{
  		// Define root container para loader
  		_loader.setRootViewContainerRef(_vcr);
  	}
}
