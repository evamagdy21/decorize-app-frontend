
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxPaginationModule } from 'ngx-pagination';
import { SimpleNotificationsModule, NotificationsService } from 'angular2-notifications';
import { LocalizationService } from './services/localization.service';
import { ProductComponent } from '../components/shared/product/product.component';
import { RouterModule } from '@angular/router';
import { ProductRatingComponent } from '../components/shared/product-rating/product-rating.component';
import { EqualValidator } from './validators/equal-validator.directive';
import { UserSideMenuComponent } from '../components/customer/user-side-menu/user-side-menu.component';
import { ToastDefaults, SnotifyService, SnotifyModule } from 'ng-snotify';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  imports: [
    RouterModule, CommonModule, ReactiveFormsModule, NgxPaginationModule, HttpClientModule, SimpleNotificationsModule.forRoot(),
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' // set defaults here
    }),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }, isolate: true
    })
  ],
  exports: [ReactiveFormsModule, CommonModule, SimpleNotificationsModule,
    FormsModule,
    SnotifyModule,
    NgxPaginationModule, HttpClientModule, TranslateModule,
    ConfirmationPopoverModule,
    ProductComponent, ProductRatingComponent, UserSideMenuComponent
  ]
  , providers: [
    NotificationsService,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService
  ]
  ,
  declarations: [ProductComponent, ProductRatingComponent, UserSideMenuComponent, EqualValidator],
})
export class SharedModule {
  constructor(private translate: TranslateService, private localizationService: LocalizationService) {
    this.translate.use(localizationService.getLanguage());
  }
}
