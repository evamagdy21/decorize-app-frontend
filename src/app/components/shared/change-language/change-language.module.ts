import { ChangeLanguageComponent } from './change-language.component';
// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { SharedModule } from '../../../shared/shared.module';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: ChangeLanguageComponent,
    }
];
@NgModule({
    imports: [
        SharedModule,
        NgxSpinnerModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ChangeLanguageComponent,
    ],
    exports: [
        ChangeLanguageComponent,
    ]
})
export class ChangeLanguageModule {

}
