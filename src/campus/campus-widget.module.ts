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
import { CourseComponent }										from './components/course/course.component';
import { CertificatesComponent }								from './components/certificates/certificates.component';
import { CertificateComponent }									from './components/certificate/certificate.component';

import { SharedModule }											from '../shared/shared.module';

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
	entryComponents:[ ],
	declarations: 	[ CampusComponent, AcountComponent, CoursesComponent, CourseComponent, CertificatesComponent, CertificateComponent ],
	exports: 		[ CampusComponent ]
})
export class CampusWidgetModule
{
	public constructor ( private logger: Logger ) { this.logger.log('CAMPUS-WIDGET-MODULE'); }
}