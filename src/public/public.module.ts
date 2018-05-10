// --- Angular imports --------------------------------------------------------------------------------------------------------------
import { NgModule, ModuleWithProviders }      																from '@angular/core';

import { Http }																								from '@angular/http';

// --- App imports ------------------------------------------------------------------------------------------------------------------
import { Loader, Logger }																					from 'mk';
import { PublicServiceModule }																				from './public-service.module'
import { PublicWidgetModule }																				from './public-widget.module';
import { SharedModule }																						from '../shared/shared.module';

@NgModule({
	imports: 		[
		PublicServiceModule.forRoot(), 
		PublicWidgetModule,
		SharedModule
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