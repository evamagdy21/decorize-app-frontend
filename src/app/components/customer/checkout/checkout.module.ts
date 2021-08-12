
// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { Routes } from "@angular/router/src";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { SharedModule } from '../../../shared/shared.module';
import {  CheckoutComponent } from './checkout.component';
import { MaterialModule } from 'src/app/material/material.module';
export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: CheckoutComponent,
    }
    
];
@NgModule({
    imports: [
        SharedModule,
        ReactiveFormsModule,
        MaterialModule,
        FormsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        CheckoutComponent 
    ],

})
export class CheckoutModule {

}
