import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxSpinnerModule } from 'ngx-spinner';
import { Routes, RouterModule } from '@angular/router';
import { NgxGalleryModule } from 'ngx-gallery';
import { CartComponent } from './cart.component';
import { SharedModule } from '../../../shared/shared.module';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '',
    component: CartComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    NgxGalleryModule,
    NgxSpinnerModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [CartComponent]
})
export class CartModule { }
