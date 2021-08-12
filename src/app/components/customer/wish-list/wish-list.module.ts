
// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { Routes } from "@angular/router/src";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from '../../../shared/shared.module';
import { WishListComponent } from './wish-list.component';
import { WishListService } from './wish-list.service';
export const routes: Routes = [
    {
        path: '',
        // pathMatch: 'full',
        component: WishListComponent,
    }
    
];
@NgModule({
    imports: [
        SharedModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        WishListComponent 
    ],
    providers:[]
    ,
    exports: [
        WishListComponent
    ]
})
export class WishListModule {

}
