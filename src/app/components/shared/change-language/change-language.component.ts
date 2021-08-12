import { LocalizationService } from './../../../shared/services/localization.service';
import { AutoLoginService } from './../../shared/auto-login/auto-login.service';
import { TokenService } from './../../../shared/services/token.service';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  moduleId: module.id,
  selector: 'change-language',
  templateUrl: 'change-language.component.html',
  styleUrls: ['change-language.component.css']
})
export class ChangeLanguageComponent implements OnInit {
  langCode: string = "";
  constructor(private localizationService: LocalizationService,
    private activatedRoute: ActivatedRoute) {
  }


  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(parms => {
      this.langCode = parms.get('code');
      this.changeLanguage(this.langCode);
      // alert("in change language " + this.langCode);
    });
  }

  changeLanguage(langCode) {
    if (langCode != this.localizationService.getLanguage()) {
      let oldLang = this.localizationService.getLanguage();
      this.localizationService.setLanguage(langCode).subscribe(res => {
        if (res == true) {
          // debugger;
          let Url = window.location.href.toString().replace(oldLang, this.localizationService.getLanguage());
          window.location.replace(Url);
        }
      });
    }
  }
}
