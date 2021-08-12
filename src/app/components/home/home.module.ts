import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { OwlModule } from 'ngx-owl-carousel';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import { SearchComponent } from '../shared/search/search.component';
import { MaterialModule } from 'src/app/material/material.module';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    OwlModule,
    Ng2CarouselamosModule,
    MaterialModule
  ],
 
  declarations: [HomeComponent,SearchComponent]
})
export class HomeModule { }
