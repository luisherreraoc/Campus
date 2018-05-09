import {BrowserAnimationsModule}                                  from '@angular/platform-browser/animations';
import { BrowserModule }                                          from '@angular/platform-browser';
import { NgModule }                                               from '@angular/core';

import { AppComponent }                                           from './app.component';

import { RouterModule, Routes }                                   from '@angular/router';

import { Logger, Loader, CoreModule, CommonModule, FormModule }   from 'mk';


import { MatDialogModule }                                        from '@angular/material';


// -- App imports ---------------------------------------------------------------------------
import { appRoutes } from './app.routes';

import { PublicModule }	from '../public/public.module';
import { CampusModule } from '../campus/campus.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot( appRoutes, { enableTracing: true } ),
      
        PublicModule,
        CampusModule,
      
        CoreModule.forRoot(),
        CommonModule,
        FormModule,

        MatDialogModule
    ],
    providers: [ 
        Loader, 
        Logger,
        {
            provide: Window,
            useValue: window
        }
    ],
    bootstrap: [AppComponent],
    exports: [ ]
})
export class AppModule { }
