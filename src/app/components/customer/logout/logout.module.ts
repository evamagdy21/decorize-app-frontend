// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { LogoutComponent } from './logout.component';
import { SharedModule } from '../../../shared/shared.module';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: LogoutComponent,
    }
];
@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
        
    ],
    declarations: [
        LogoutComponent,
    ],
    exports: [
        LogoutComponent,
    ]
})
export class LogoutModule {

}
