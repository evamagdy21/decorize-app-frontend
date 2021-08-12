
// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { Routes } from "@angular/router/src";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from '../../../shared/shared.module';
import { OrderConfirmationComponent } from '../order-confirmation/order-confirmation.component';
export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: OrderConfirmationComponent,
    },
    
];
@NgModule({
    imports: [
        SharedModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        OrderConfirmationComponent 
    ],
    providers:[]
    ,
    exports: [
        OrderConfirmationComponent
    ]
})
export class OrderConfirmationModule {

}
