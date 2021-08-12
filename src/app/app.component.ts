import { Component } from '@angular/core';
import { LocalizationService } from './shared/services/localization.service';
import { NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Decorize';
  lang:string;
  lat = 22.2736308;
  long = 70.7512555;
  constructor(private localizationService: LocalizationService, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        (<any>window).ga('set', 'page', event.urlAfterRedirects);
        (<any>window).ga('send', 'pageview');
      }
    });
    this.localizationService.setLanguage(this.localizationService.getLanguage());
    this.loadStyles();

  }

  loadStyles() {
     this.lang = this.localizationService.getLanguage();
    if (this.lang == 'ar') {
      require("style-loader!../assets/css/bootstrap/bootstrap-ar.css");
      require("style-loader!../assets/css/style-en.css");
      require("style-loader!../assets/css/style.css");
    } else {

      require("style-loader!../assets/css/bootstrap/bootstrap.css");
      require("style-loader!../assets/css/style-en.css");
      
    }
  }
  // loadStyles() {
  //   let lang: string = this.localizationService.getLanguage();
  //   if (lang == 'ar') {
  //     // require("style-loader!../assets/vendor/rtl/bootstrap.rtl.css");
  //     // require("style-loader!../assets/vendor/rtl/sb-admin-2.css");
  //     // require("style-loader!../assets/css/ar/style.css");
  //   } else {
  //     // require("style-loader!../assets/admin/vendor/bootstrap/css/bootstrap.min.css");
  //     // require("style-loader!../assets/admin/dist/css/sb-admin-2.css");
  //   }
  // }

}

