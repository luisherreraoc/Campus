// --- Angular imports --------------------------------------------------------------------------------------------------------------
import { NgModule, ModuleWithProviders }      					from '@angular/core';
import { CommonModule } 										from '@angular/common'; 

import { RouterModule, Routes } 								from '@angular/router';

// --- Mk imports -----------------------------------------------------------------------
import { Logger, CoreModule, CommonModule as MkC, FormModule }	from 'mk';

// --- App imports ----------------------------------------------------------------------
import { publicRoutes }											from './public.routes';

import { PublicComponent }										from './components/main/public.component';
import { LoginComponent }										from './components/login/login.component';
import { RegistroComponent }									from './components/registro/registro.component';
//import { PasswordRecoveryComponent }							from './components/password/password-recovery.component';
//import { PasswordChangeComponent }							from './components/password/password-change.component';
//import { DialogTermsAndConditionsComponent }					from './components/dialogs/dialog-terms-and-conditions.component'


/**
 *	Widget module for common components and directives
 */
@NgModule({
	imports: 		[ 
		CommonModule,
		RouterModule.forChild(publicRoutes),

		CoreModule.forRoot(),
    	MkC,
    	FormModule
	],
	entryComponents:[ ],
	declarations: 	[ PublicComponent, LoginComponent, RegistroComponent, /*PasswordRecoveryComponent, PasswordChangeComponent, DialogTermsAndConditionsComponent,*/ ],
	exports: 		[ PublicComponent ]
})
export class PublicWidgetModule
{
	public constructor ( private logger: Logger ) { this.logger.log('PUBLIC-WIDGET-MODULE'); }
}