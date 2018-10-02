// --- Angular imports --------------------------------------------------------------------------------------------------------------
import { NgModule, ModuleWithProviders }      					from '@angular/core';
import { CommonModule } 										from '@angular/common'; 

import { RouterModule, Routes } 								from '@angular/router';

import { FormsModule, ReactiveFormsModule } 											from '@angular/forms';

// --- Mk imports -----------------------------------------------------------------------
import { Logger, CoreModule, CommonModule as MkC, FormModule }	from 'mk';

// --- App imports ----------------------------------------------------------------------
import { campusRoutes }											from './campus.routes';

import { CampusComponent }										from './components/main/campus.component';
import { AcountComponent }										from './components/acount/acount.component';
import { CoursesComponent }										from './components/courses/courses.component';
import { CourseCardComponent }									from './components/course-card/course-card.component';
import { CertificatesComponent }								from './components/certificates/certificates.component';
import { CertificateCardComponent }								from './components/certificate-card/certificate-card.component';
import { CertificateRequestComponent }							from './components/certificate-request/certificate-request.component';
import { PasswordChangeComponent }								from './components/password-change/password-change.component';
import { AvatarComponent }										from './components/avatar/avatar.component';
import { CropperComponent }										from './components/cropper/cropper.component';

import { SharedModule }											from '../shared/shared.module';

import { DraggableDirective } 									from './directives/draggable.directive';

import { Ng2CarouselamosModule } from 'ng2-carouselamos';

// --- Dialogs --------------------------------------------------------------------------
import { UserJobsDialogComponent } from './components/dialogs/user-jobs-dialog.component';
import { UserInfoDialog } from './components/dialogs/user-info-dialog.component';
import { FormErrorDialog } from './components/dialogs/form-error-dialog.component';
import { LogOutComponent } from './components/log-out/log-out.component';

/**
 *	Widget module for common components and directives
 */
@NgModule({
	imports: 		[ 
		CommonModule,
		RouterModule.forChild(campusRoutes),

		CoreModule.forRoot(),
    	MkC,
    	FormModule,
    	
    	ReactiveFormsModule,

		SharedModule,

		Ng2CarouselamosModule
	],
	entryComponents:[ UserJobsDialogComponent, CropperComponent, UserInfoDialog, FormErrorDialog ],
	declarations: 	[ 
		CampusComponent, 
		AcountComponent, 
		CoursesComponent, 
		CourseCardComponent, 
		CertificatesComponent, 
		CertificateCardComponent, 
		CertificateRequestComponent, 
		UserJobsDialogComponent, 
		UserInfoDialog,
		FormErrorDialog,
		PasswordChangeComponent,
		AvatarComponent, 
		CropperComponent, 
		DraggableDirective,
		LogOutComponent
	],
	exports: 		[ CampusComponent ]
})
export class CampusWidgetModule
{
	public constructor ( private logger: Logger ) { this.logger.log('CAMPUS-WIDGET-MODULE'); }
}