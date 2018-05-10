// --- Angular imports --------------------------------------------------------------------------------------------------
import { NgModule, ModuleWithProviders }      													from '@angular/core';
import { Http }																					from '@angular/http';
import { CommonModule }																			from '@angular/common';
import { Logger, Loader }																		from 'mk';
import { Router }             																	from '@angular/router';

// --- App imports ------------------------------------------------------------------------------------------------------
import { AuthGuard }																			from './services/auth-guard.service';
import { AuthService }																			from './services/auth.service';
import { StorageService }																		from './services/storage.service';

//import { PasswordService }																		from './services/password.service';

@NgModule({
	imports: 		[ ],
	entryComponents:[ ],
	declarations: 	[ ],
	exports: 		[ ]
})
export class SharedServiceModule
{
	public constructor ( private logger: Logger ) { this.logger.log('PUBLIC-SERVICE-MODULE'); }

	// -- Asegura que los services declarados en el modulo sean singleton --
	static forRoot(): ModuleWithProviders 
	{
		return {
			ngModule: SharedServiceModule,
			providers: [
				{
					provide: AuthGuard,
					useClass: AuthGuard,
					deps: [ Logger, Loader, AuthService, Router ]
				},
				{
					provide: AuthService,
					useClass: AuthService,
					deps: [ Http, Logger, Loader ]
				},
				{
					provide: StorageService,
					useClass: StorageService,
					deps: [ Logger ]
				},
			]
		}
	}
}