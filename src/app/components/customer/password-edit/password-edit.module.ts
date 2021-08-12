
// Angular Imports
import { NgModule } from '@angular/core';
// This Module's Components
import { Routes } from "@angular/router/src";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from '../../../shared/shared.module';
import { PasswordEditComponent } from './password-edit.component';
export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: PasswordEditComponent,
    }
];
@NgModule({
    imports: [
        SharedModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        PasswordEditComponent
    ],
    providers: []
    ,
    exports: [
        PasswordEditComponent
    ]
})
export class PasswordEditModule {

}
