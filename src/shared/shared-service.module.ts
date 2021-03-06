// --- Angular imports --------------------------------------------------------------------------------------------------
import { NgModule, ModuleWithProviders }      													from '@angular/core';
import { Http, XHRBackend, RequestOptions }																					from '@angular/http';
import { CommonModule }																			from '@angular/common';
import { Logger, Loader }																		from 'mk';
import { Router }             																	from '@angular/router';

// --- App imports ------------------------------------------------------------------------------------------------------
import { PublicGuard }																			from './services/public-guard.service';
import { AuthGuard }																			from './services/auth-guard.service';
import { AuthService }																			from './services/auth.service';
import { StorageService }																		from './services/storage.service';

import { httpFactoryCustom }																	from './services/intercepted-http-custom';
import { InterceptedHttp }																		from 'mk';

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
				StorageService,
				{
					provide: PublicGuard,
					useClass: PublicGuard,
					deps: [ Logger, Loader, AuthService, Router ]
				},
				{
					provide: AuthGuard,
					useClass: AuthGuard,
					deps: [ Logger, Loader, AuthService, Router ]
				},
				{
					provide: AuthService,
					useClass: AuthService,
					deps: [ Http, Logger, Loader, StorageService, Router ]
				},
			]
		}
	}
}