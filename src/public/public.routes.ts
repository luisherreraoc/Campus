// -- Angular imports -------------------------------------------------------------------------------
import { RouterModule, Routes } from '@angular/router';

// -- App imports -----------------------------------------------------------------------------------
import { PublicComponent } 										from '../public/components/main/public.component';
import { LoginComponent }										from '../public/components/login/login.component';
import { RegistroComponent }									from '../public/components/registro/registro.component';
import { PasswordRecoveryComponent }							from '../public/components/password-recovery/password-recovery.component';

import { environment }											from '../environments/environment';

import { PublicGuard }											from '../shared/services/public-guard.service';

export const publicRoutes: Routes = 
[
	{ 
		path: environment.pathPublic, 
		component: PublicComponent,
		canActivate: [PublicGuard],
		children: [
				{	
				path: '',
				canActivateChild: [PublicGuard],
				children: [
					{ path: '', redirectTo: environment.pathLogin, pathMatch: 'full' },
					//{ path: '**', redirectTo: environment.pathLogin, pathMatch: 'full' },
					{ path: environment.pathLogin, component: LoginComponent },
					{ path: environment.pathRegistro, component: RegistroComponent },
					{ path: environment.pathPassRecovery + '/:usr', component: PasswordRecoveryComponent },
					{ path: environment.pathPassRecovery, component: PasswordRecoveryComponent }
				]
			}
		]
	}
];