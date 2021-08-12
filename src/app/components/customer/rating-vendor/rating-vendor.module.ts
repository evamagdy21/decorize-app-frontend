
// Angular Imports
import { NgModule } from '@angular/core';
// This Module's Components
import { Routes } from "@angular/router/src";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from '../../../shared/shared.module';
import { RatingVendorComponent } from './rating-vendor.component';
import { RatingVendorService } from './rating-vendor.service';
import { BarRatingModule } from "ng2-bar-rating";
export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: RatingVendorComponent,
    }
    
];
@NgModule({
    imports: [
        SharedModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        BarRatingModule
    ],
    declarations: [
        RatingVendorComponent 
    ],
    providers:[RatingVendorService]
    ,
    exports: [
        RatingVendorComponent
    ]
})
export class RatingVendorModule {

}
