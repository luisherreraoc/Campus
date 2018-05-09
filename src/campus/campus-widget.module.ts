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

import { SharedModule }											from '../shared/shared.module';


// --- Dialogs --------------------------------------------------------------------------
import { UserJobsDialogComponent } from './components/dialogs/user-jobs-dialog.component';


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

    	SharedModule
	],
	entryComponents:[ UserJobsDialogComponent ],
	declarations: 	[ CampusComponent, AcountComponent, CoursesComponent, CourseCardComponent, CertificatesComponent, CertificateCardComponent, UserJobsDialogComponent ],
	exports: 		[ CampusComponent ]
})
export class CampusWidgetModule
{
	public constructor ( private logger: Logger ) { this.logger.log('CAMPUS-WIDGET-MODULE'); }
}