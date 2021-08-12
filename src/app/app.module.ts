import { GroupHeadersComponent } from './components/shared/group-headers/group-headers.component';
import { LocalizationService } from './shared/services/localization.service';

import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpClientModule } from '@ngx-progressbar/http-client';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { TopNavbarComponent } from './components/shared/top-navbar/top-navbar.component';
import { LayoutComponent } from './components/shared/layout/layout.component';
import { NgxSpinnerModule } from 'ngx-spinner';
//import { SearchComponent } from './components/shared/search/search.component';
import { MenuComponent } from './components/shared/menu/menu.component';
import { HttpModule } from '@angular/http';
import { LocalStorageModule } from 'angular-2-local-storage';
import { ModalModule } from 'ngx-bootstrap/modal';
import { APP_BASE_HREF } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { CheckoutComponent } from './components/customer/checkout/checkout.component';
import { shippingAddressService } from './components/customer/shipping-address/shipping-address.service';
import { SignalRService } from './shared/services/signalr.service';
import { NotificationShowComponent } from './components/shared/notification/notification-show.component';
import { ProductDetailsPopupComponent } from './components/product-details-popup/product-details-popup.component';
import { NgxGalleryModule } from 'ngx-gallery';

export function getBaseURL(_changeLanguageService: LocalizationService): string {
  let lang = _changeLanguageService.getBaseLanguage();

  return lang;
}
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent, HeaderComponent, GroupHeadersComponent, FooterComponent, MenuComponent, TopNavbarComponent, LayoutComponent,
    NotificationShowComponent,ProductDetailsPopupComponent
  ],
  entryComponents:[NotificationShowComponent,ProductDetailsPopupComponent],

  imports: [
    BrowserModule, AppRoutingModule, SharedModule, HttpClientModule, FormsModule,
    HttpModule,
    NgxGalleryModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgProgressModule.forRoot(),
    NgProgressHttpClientModule, BrowserAnimationsModule,
    NgxSpinnerModule,
    ModalModule.forRoot(),
    LocalStorageModule.withConfig({
      prefix: 'app',
      storageType: 'localStorage'
    }),
    MaterialModule,

  ],
  exports: [
    MaterialModule
  ],
  providers: [
    TranslateService,
    SignalRService,
    shippingAddressService,
    {
      provide: APP_BASE_HREF,
      useFactory: getBaseURL,
      deps: [LocalizationService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
