// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { Routes } from "@angular/router/src";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { SharedModule } from '../../../shared/shared.module';
import { ForgetPasswordComponent } from './forget-password.component';
export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: ForgetPasswordComponent,
    }
    
];
@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ForgetPasswordComponent
    ],
    exports: [
       
        ForgetPasswordComponent,
    ]
})
export class ForgetPasswordModule {

}
