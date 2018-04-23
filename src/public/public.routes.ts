// -- Angular imports -------------------------------------------------------------------------------
import { RouterModule, Routes } from '@angular/router';

// -- App imports -----------------------------------------------------------------------------------
import { PublicComponent } 										from '../public/components/main/public.component';
import { LoginComponent }										from '../public/components/login/login.component';
import { RegistroComponent }									from '../public/components/registro/registro.component';

export const publicRoutes: Routes = 
[
	{ 
		path: 'public', 
		component: PublicComponent,
		children: [
			{ path: '', redirectTo: 'login', pathMatch: 'full' },
			{ path: 'login', component: LoginComponent },
			{ path: 'registro', component: RegistroComponent }
		]
	}
];