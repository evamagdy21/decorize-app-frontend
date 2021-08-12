
// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { RegisterComponent } from './register.component';
import { Routes } from "@angular/router/src";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
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
        //   ,
        //   {
        //     id: GoogleLoginProvider.PROVIDER_ID,
        //     provider: new GoogleLoginProvid("Your-Google-Client-Id")
        //   },
        ]
    );
    return config;
  }
export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: RegisterComponent,
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
        RegisterComponent 
    ],
    providers:[
        {
            provide: AuthServiceConfig,
            useFactory: getAuthServiceConfigs
          }
    ]
    ,
    exports: [
       
        RegisterComponent,
    ]
})
export class RegisterModule {

}
