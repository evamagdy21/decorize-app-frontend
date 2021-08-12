import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductGridComponent } from './product-grid/product-grid.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from '../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { NgxGalleryModule } from 'ngx-gallery';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '',
    component: ProductGridComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    NgxGalleryModule,
    NgxSpinnerModule,
    SharedModule,
    RouterModule.forChild(routes)
    // NgbModule.forRoot(),    
  ],
  declarations: [ProductGridComponent]
})
export class ProductModule { }
