// --- Angular imports --------------------------------------------------------------------------------------------------------------
import { NgModule, ModuleWithProviders }      					from '@angular/core';
import { CommonModule } 										from '@angular/common'; 

import { FormsModule, ReactiveFormsModule } 					from '@angular/forms';

// --- Mk imports -----------------------------------------------------------------------
import { Logger, CoreModule, CommonModule as MkC, FormModule }	from 'mk';

import { ResponseComponent }									from './components/response/response.component';

/**
 *	Widget module for common components and directives
 */
@NgModule({
	imports: 		[ 
		CommonModule,
		CoreModule.forRoot(),
    	MkC,
    	FormModule,
    	ReactiveFormsModule
	],
	entryComponents:[ ],
	declarations: 	[ ResponseComponent ],
	exports: 		[ ResponseComponent ]
})
export class SharedWidgetModule
{
	public constructor ( private logger: Logger ) { this.logger.log('SHARED-WIDGET-MODULE'); }
}