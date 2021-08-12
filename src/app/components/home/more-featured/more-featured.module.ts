import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoreFeaturedComponent } from './more-featured.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { MaterialModule } from 'src/app/material/material.module';

const routes: Routes = [
  {
    path: '',
    component: MoreFeaturedComponent,
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MaterialModule
  ],
  declarations: [MoreFeaturedComponent]
})
export class MoreFeaturedModule { }
