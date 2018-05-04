// -- Angular imports -------------------------------------------------------------------------------
import { RouterModule, Routes } from '@angular/router';

// -- App imports -----------------------------------------------------------------------------------
import { PublicComponent } 										from '../public/components/main/public.component';
import { CampusComponent }										from '../campus/components/main/campus.component';

import { AuthGuard }											from '../shared/services/auth-guard.service';

import { environment }											from '../environments/environment';

export const appRoutes: Routes = 
[
	{ path: environment.pathPublic, component: PublicComponent },
	{ path: '', redirectTo: '/public/login', pathMatch: 'full' },
	{ path: environment.pathCampus, component: CampusComponent, canActivate: [AuthGuard] }
];