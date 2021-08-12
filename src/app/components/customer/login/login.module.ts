// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { LoginComponent } from './login.component';
import { Routes } from "@angular/router/src";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../../../shared/shared.module';

import {
    SocialLoginModule,
    AuthServiceConfig,
    GoogleLoginProvider,
    FacebookLoginProvider,
} from "angular5-social-login";

export function getAuthServiceConfigs() {
    let config = new AuthServiceConfig(
        [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider("318241298960429")
          }
          
        ]
    );
    return config;
  }

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: LoginComponent,
    }
    
];
@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        SocialLoginModule
    ],
    declarations: [
        LoginComponent
    ],
    exports: [
       
        LoginComponent,
    ],
    providers:[
        {
            provide: AuthServiceConfig,
            useFactory: getAuthServiceConfigs
        }
        
    ]
})
export class LoginModule {

}
