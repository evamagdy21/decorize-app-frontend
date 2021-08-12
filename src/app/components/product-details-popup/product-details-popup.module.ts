import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductDetailsPopupComponent } from './product-details-popup.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
import { NgxGalleryModule } from 'ngx-gallery';
const routes: Routes = [
  {
    path: '',
    component: ProductDetailsPopupComponent
  }
]


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    NgxGalleryModule
  ],
  declarations: []
})
export class ProductDetailsPopupModule { }
