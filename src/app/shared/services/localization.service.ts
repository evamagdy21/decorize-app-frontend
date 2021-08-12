import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'angular-2-local-storage/dist/local-storage.service';
import { Observable, observable ,of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {

  constructor(private localStorageService: LocalStorageService, public translate: TranslateService) { }
  getBaseLanguage(): string {
    let url: string = location.href;
    // alert(url);
    if (this.getLanguage() == 'en') {
      // this.setLanguage("en");
      return "/en";
    }
    else {
      // this.setLanguage("ar");
      return "/ar";
    }
  }
  setLanguage(lang: string): Observable<boolean> {
    let result: Observable<any>;
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
    if (this.localStorageService.set("lang", lang.toLowerCase()))
      return Observable.of(true);
    return Observable.of(false);
  }
  hasLanguage() {
    let lang: string = this.localStorageService.get("lang");
    return (lang != null && lang != "" && lang != "undefined")
  }

  getLanguage() {
    let lang: string = this.localStorageService.get("lang");
    if (lang == "" || lang == null || lang == 'undefined') {
      return this.getDefaultLanguage();
    }
    return lang;
  }

  private getDefaultLanguage() {
    return "ar";
  }
}
