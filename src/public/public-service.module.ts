// --- Angular imports --------------------------------------------------------------------------------------------------
import { NgModule, ModuleWithProviders }      													from '@angular/core';
import { Http }																					from '@angular/http';
import { CommonModule }																			from '@angular/common';
import { Logger, Loader }																		from 'mk';

// --- App imports ------------------------------------------------------------------------------------------------------
//import { PasswordRecoveryService }																from './services/password-recovery.service';

import { RegistroService }																		from './services/registro.service';
import { PasswordService }																		from './services/password.service';

@NgModule({
	imports: 		[ ],
	entryComponents:[ ],
	declarations: 	[ ],
	exports: 		[ ]
})
export class PublicServiceModule
{
	public constructor ( private logger: Logger ) { this.logger.log('PUBLIC-SERVICE-MODULE'); }

	// -- Asegura que los services declarados en el modulo sean singleton --
	static forRoot(): ModuleWithProviders 
	{
		return {
			ngModule: PublicServiceModule,
			providers: [ /*PasswordRecoveryService*/

				{
					provide: RegistroService,
					useClass: RegistroService,
					deps: [ Http, Loader, Logger ]
				},
				{
					provide: PasswordService,
					useClass: PasswordService,
					deps: [ Http, Loader, Loader ]
				}

			]
		}
	}
}