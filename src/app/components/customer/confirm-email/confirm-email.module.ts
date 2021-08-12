
// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { Routes } from "@angular/router/src";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from '../../../shared/shared.module';
import {  IndexComponent} from './index.component';
export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: IndexComponent,
    },
    
];
@NgModule({
    imports: [
        SharedModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        IndexComponent 
    ],
    providers:[]
    ,
    exports: [
        IndexComponent
    ]
})
export class ConfirmEmailModule {

}
