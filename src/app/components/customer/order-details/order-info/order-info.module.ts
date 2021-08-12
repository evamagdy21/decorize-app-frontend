import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderInfoComponent } from './order-info.component';
import { Routes } from "@angular/router/src";
import { RouterModule } from "@angular/router";
import { SharedModule } from 'src/app/shared/shared.module';
import { OrderDetailsService } from '../order-details.service';
import { BarRatingModule } from "ng2-bar-rating";
import { RatingVendorService } from '../../rating-vendor/rating-vendor.service';

export const routes: Routes = [
  {
      path: '',
      pathMatch: 'full',
      component: OrderInfoComponent,
  }

];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    BarRatingModule
  ],
  declarations: [OrderInfoComponent],
  providers: [OrderDetailsService,RatingVendorService]
  ,
})
export class OrderInfoModule { }
