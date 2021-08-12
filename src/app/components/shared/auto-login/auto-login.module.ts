// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { Routes } from "@angular/router/src";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../../../shared/shared.module';
import { AutoLoginComponent } from './auto-login.component';
export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: AutoLoginComponent
    }
    
];
@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        AutoLoginComponent
    ],
    exports: [
       
        
    ]
})
export class AutoLoginModule {

}
