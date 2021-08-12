import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from '../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { NgxGalleryModule } from 'ngx-gallery';
import { ProductDetailsComponent } from './product-details.component';
import { SnotifyModule } from 'ng-snotify';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '',
    component: ProductDetailsComponent
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
  declarations: [ProductDetailsComponent]
})
export class ProductDetailsModule { }
