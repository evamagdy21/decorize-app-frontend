import { RealtimeNotificationViewModel } from './../../../shared/view-models/realtime-notification-view-model';
import { SignalRService } from './../../../shared/services/signalr.service';
import { TranslateService } from '@ngx-translate/core';
import { LocalizationService } from './../../../shared/services/localization.service';
import { OnInit, Component } from "@angular/core";
import { CustomerService } from "../../../shared/services/account/customer.service";
import { CustomerCartService } from "../../../shared/services/cart.service";
import { LocalStorageService } from "angular-2-local-storage/dist/local-storage.service";
import { Router } from "@angular/router";
import { AutoLoginService } from '../auto-login/auto-login.service';

import { TokenService } from '../../../shared/services/token.service';
@Component({
    moduleId: module.id,
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit {
    isLoggedIn = false;
    cartQTY: number;
    wishlistQTY: number;
    userID: number;
    message: any;
    userName = "";
    isSelected: boolean = false;
    langIsSelected: boolean = false;
    lang: string = "";
    currentUser: any;
    constructor(private router: Router,
        private autoLoginService: AutoLoginService,
        private localStorageService: LocalStorageService,
        private cartService: CustomerCartService,
        private localizationService: LocalizationService,
        private translate: TranslateService,
        private customerService: CustomerService,
        private tokenStorage: TokenService) {
    }


    ngOnInit() {
        // alert(this.lang)
        // this.cartService.getCartLength().subscribe(res => {
        //     this.cartQTY = res;
        // });
        if (this.tokenStorage.getToken()) {
            this.isLoggedIn = true;
           
        }
        this.currentUser = this.tokenStorage.getUser();

 
    }

    isDiabledLink(code) {
        this.lang = this.localStorageService.get("lang");
        if (this.lang == code) {
            return true;
        }
        return false;
    }
    // clearCart(): void {
    //     this.cartService.clear();
    // }
    logout(): void {
        this.tokenStorage.signOut();
        window.location.reload();
      }
  

    changeSelecteion() {
        this.isSelected = !this.isSelected;

    }

    changeLangSelecteion() {
        this.langIsSelected = !this.langIsSelected;
    }

    changeLanguage(langCode) {
        if (langCode != this.localizationService.getLanguage()) {
            // debugger
            let oldLang = this.localizationService.getLanguage();
            this.localizationService.setLanguage(langCode).subscribe(res => {
                if (res == true) {
                  
                    let Url = window.location.href.toString().replace(oldLang, this.localizationService.getLanguage());
                    window.location.replace(Url);
 
                }
            });
           
        }
    }

}
