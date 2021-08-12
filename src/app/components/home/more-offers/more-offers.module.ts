import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoreOffersComponent } from './more-offers.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material/material.module';
const routes: Routes = [
  {
    path: '',
    component: MoreOffersComponent,
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MaterialModule
  ],
  declarations: [MoreOffersComponent]
})
export class MoreOffersModule { }
