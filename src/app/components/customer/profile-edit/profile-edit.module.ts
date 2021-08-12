
// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { Routes } from "@angular/router/src";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from '../../../shared/shared.module';
import { ProfileEditComponent } from './profile-edit.component';
export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: ProfileEditComponent,
    }
];
@NgModule({
    imports: [
        SharedModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ProfileEditComponent
    ],
    providers: []
    ,
    exports: [
        ProfileEditComponent
    ]
})
export class ProfileEditModule {

}
