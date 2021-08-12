import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create.component';
import { Routes } from "@angular/router/src";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from 'src/app/shared/shared.module';
import { shippingAddressService } from '../shipping-address.service';

export const routes: Routes = [
  {
      path: '',
      pathMatch: 'full',
      component: CreateComponent,
  }
  
];
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CreateComponent],
  providers: [shippingAddressService]
})
export class CreateModule { }
