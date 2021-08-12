
// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { Routes } from "@angular/router/src";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from '../../../shared/shared.module';
import { IndexComponent } from './index/index.component';
import { shippingAddressService } from './shipping-address.service';
export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: IndexComponent,
    }
    
    ,

    // {
    //     path: 'edit/:id',
    //     component: CreateComponent
    // }
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
    providers: [shippingAddressService]
    ,
    exports: [
        IndexComponent
    ]
})
export class ShippingAddressModule {

}
