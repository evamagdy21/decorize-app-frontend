import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// This Module's Components
import { ContactUsComponent } from './contact-us.component';
import { Routes } from "@angular/router/src";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from '../../../shared/shared.module';
export const routes: Routes = [
  {
      path: '',
      pathMatch: 'full',
      component: ContactUsComponent,
  }
  
];
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ContactUsComponent]
})

export class ContactUsModule { }
