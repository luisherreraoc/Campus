// --- Angular imports --------------------------------------------------------------------------------------------------------------
import { NgModule, ModuleWithProviders }      																from '@angular/core';

import { Http }																								from '@angular/http';

// --- App imports ------------------------------------------------------------------------------------------------------------------
import { Loader, Logger }																					from 'mk';
import { PublicServiceModule }																				from './public-service.module'
import { PublicWidgetModule }																				from './public-widget.module';

@NgModule({
	imports: 		[ 
		PublicServiceModule.forRoot(), 
		PublicWidgetModule
	],
	entryComponents:[ ],
	declarations: 	[ ],
	exports: 		[ PublicWidgetModule ],
	providers: 		[ Loader, Logger ]
})
export class PublicModule
{
	public constructor ( private logger: Logger ) { this.logger.log('PUBLIC-MODULE'); }
}