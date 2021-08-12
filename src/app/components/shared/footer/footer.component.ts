import { PageViewModel } from './../../../shared/view-models/page-view-model';
import { MenuService } from './../menu/menu.service';
import { departmentCategoriesViewModel } from './../../../shared/view-models/department-categories-view-model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Patterns } from '../../../common/patterns';
import { SubscribeViewModel } from './subscribe-view-model';
import { NotificationsService } from 'angular2-notifications';
import { FooterService } from './footer.service';
import { LocalStorageService } from 'angular-2-local-storage';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  form: FormGroup;
 lang :string;
  isSaving: boolean = false;
  subscribe: boolean = true;
  Menu: departmentCategoriesViewModel[] = [];
  pagesList:PageViewModel[]=[];
  
  model: SubscribeViewModel = new SubscribeViewModel();
  constructor(private formbuilder: FormBuilder,private menuService: MenuService, 
    private _notificationsService: NotificationsService, 
    private localStorageService : LocalStorageService,
    private footerService: FooterService) {
      this.lang=this.localStorageService.get("lang");
  }

  ngOnInit() {
    this.fillmenu();
    this.fillFooterPages();
    this.createForm();
  }
  createForm(): void {
    this.form = this.formbuilder.group({
      Email: ['', [Validators.required, Validators.pattern(Patterns.Email)]]
    });
  }

  fillFooterPages(){
    this.footerService.getFooterPagesList().subscribe((response) => {
      this.pagesList = response.Data;
      console.log("this.pagesList : " + JSON.stringify(this.pagesList));
    });
  }

  redirectToPage(item:PageViewModel)
  {
  }

  save(): void {
    this.isSaving = true;
    let subscriber = Object.assign({}, this.model, this.form.value) as SubscribeViewModel;

    this.footerService.Post(subscriber).subscribe((response) => {
 
      this.subscribe = true;
      if (response.Success) {
  
        var message=(this.lang=="ar")?"تم الاشتراك بنجاح":"Your subscription has been successful"
        this.showSuccessNotification(message, "");
        this.form.controls['Email'].setValue('');
        this.form.controls['Email'].setErrors(null);
      }
    }, error => {

      var message=(this.lang=="ar")?" يرجي المحاولة لاحقا":" Please try later"
      this.showErrorNotification(message,"");
    }, () => {
      this.isSaving = false;
    });
  }

  showSuccessNotification(title: string, content: string = "") {
    this._notificationsService.success(
      title,
      content,
      {
        timeOut: 2000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: true,
        maxLength: 3
      }
    );
  }
  fillmenu() {
    this.menuService.get().subscribe((response) => {
      this.Menu = response.Data;
      this.Menu.forEach(x => x.IsSelected = false);
     
    });
  }
  showErrorNotification(title: string, content: string = "") {
   
    this._notificationsService.error(
      title,
      content,
      {
        timeOut: 2000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: true,
        maxLength: 3
      }
    );
  }
}

