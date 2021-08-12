// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components

import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { SharedModule } from '../../../shared/shared.module';
import { ResetPasswordComponent } from './reset-password.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: ResetPasswordComponent,
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
        ResetPasswordComponent
    ],
    exports: [
       
        ResetPasswordComponent,
    ]
})
export class ResetPasswordModule {

}
