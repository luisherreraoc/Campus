import {BrowserAnimationsModule}                                  from '@angular/platform-browser/animations';
import { BrowserModule }                                          from '@angular/platform-browser';
import { NgModule }                                               from '@angular/core';

import { AppComponent }                                           from './app.component';

import { RouterModule, Routes }                                   from '@angular/router';

import { Logger, Loader, CoreModule, CommonModule, FormModule }   from 'mk';


// -- App imports ---------------------------------------------------------------------------
import { appRoutes } from './app.routes';

import { PublicModule }	from '../public/public.module';


@NgModule({
    declarations: [
          AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot( appRoutes, { enableTracing: true } ),
      
        PublicModule,
      
        CoreModule.forRoot(),
        CommonModule,
        FormModule
    ],
    providers: [ Loader, Logger ],
    bootstrap: [AppComponent]
})
export class AppModule { }
