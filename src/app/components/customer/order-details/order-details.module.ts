
// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { Routes } from "@angular/router/src";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from '../../../shared/shared.module';
import { OrderDetailsComponent } from './order-details.component';
import { OrderDetailsService } from './order-details.service';
import { MaterialModule } from 'src/app/material/material.module';
export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: OrderDetailsComponent,
    }

];
@NgModule({
    imports: [
        SharedModule,
        ReactiveFormsModule,
        MaterialModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        OrderDetailsComponent
    ],
    providers: [OrderDetailsService]
    ,
    exports: [
        OrderDetailsComponent
    ]
})
export class OrderDetailsModule {

}
