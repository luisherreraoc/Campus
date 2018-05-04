// --- Angular imports --------------------------------------------------------------------------------------------------------------
import { NgModule, ModuleWithProviders }      																from '@angular/core';

import { Http }																								from '@angular/http';

// --- App imports ------------------------------------------------------------------------------------------------------------------
import { Loader, Logger }																					from 'mk';
import { SharedServiceModule }																				from './shared-service.module'
import { SharedWidgetModule }																				from './shared-widget.module';

@NgModule({
	imports: 		[
		SharedServiceModule.forRoot(), 
		SharedWidgetModule
	],
	entryComponents:[ ],
	declarations: 	[ ],
	exports: 		[ SharedWidgetModule ],
	providers: 		[ Loader, Logger ]
})
export class SharedModule
{
	public constructor ( private logger: Logger ) { this.logger.log('SHARED-MODULE'); }
}