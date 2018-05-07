// --- Angular imports --------------------------------------------------------------------------------------------------------------
import { NgModule, ModuleWithProviders }      																from '@angular/core';

import { Http }																								from '@angular/http';

// --- App imports ------------------------------------------------------------------------------------------------------------------
import { Loader, Logger, MkFormService }																	from 'mk';
import { CampusServiceModule }																				from './campus-service.module'
import { CampusWidgetModule }																				from './campus-widget.module';

import { CoursesService }																		from './services/courses.service';

@NgModule({
	imports: 		[ 
		CampusServiceModule.forRoot(), 
		CampusWidgetModule
	],
	entryComponents:[ ],
	declarations: 	[ ],
	exports: 		[ CampusWidgetModule ],
	providers: 		[ Loader, Logger ]
})
export class CampusModule
{
	public constructor ( private logger: Logger, private fs: MkFormService, private cs: CoursesService ) 
	{ 
		this.logger.log('CAMPUS-MODULE'); 

		fs.addServices([cs]);
	}
}