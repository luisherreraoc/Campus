// -- Angular imports -------------------------------------------------------------------------------
import { RouterModule, Routes } from '@angular/router';

// -- App imports -----------------------------------------------------------------------------------
import { PublicComponent } 										from '../public/components/main/public.component';

export const appRoutes: Routes = 
[
	{ path: 'public', component: PublicComponent },
	{ path: '', redirectTo: '/public/login', pathMatch: 'full' }
];