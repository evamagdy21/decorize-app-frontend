import { Component, OnInit, Output } from '@angular/core';
import { CustomerService } from '../../../shared/services/account/customer.service';
import { EventEmitter } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from '@angular/router';
import { AutoLoginService } from '../../shared/auto-login/auto-login.service';

@Component({
    moduleId: module.id,
    selector: 'user-side-menu',
    templateUrl: './user-side-menu.component.html',
    styleUrls: ['./user-side-menu.component.css']
})
export class UserSideMenuComponent implements OnInit {
    userName: string = "";
    CustomerPhoto:string;
    @Output() sendNotification: EventEmitter<object> = new EventEmitter();

    constructor(private router: Router, private autoLoginService: AutoLoginService, private customerService: CustomerService,
        private localStorageService: LocalStorageService,
        private _notificationsService: NotificationsService) {
        // this.userName = localStorage.getItem("userName");
        this.customerService.UserName().subscribe(res => {
            this.userName = res;
        })
        // this.customerService.getUser().subscribe(response => {
        //     if (response.Success) {
             
           
        //         console.log(response.Data)
        //         this.CustomerPhoto=response.Data.profileImg
        //     }
           
        // }); 
        // this.userName = this.localStorageService.get("userName");
    }
    ngOnInit() {
        this.customerService.getUser().subscribe(response => {
            if (response.Success) {
             
           
                console.log(response.Data)
                this.CustomerPhoto=response.Data.profileImg
            }
           
        }); 
    }
    UploadLogoFile(event) {
        const fileList: FileList = event.target.files;
        console.log(fileList)
        if (fileList.length > 0) {
            const file: File = fileList[0];
            const formData: FormData = new FormData();
            formData.append('uploadFile', file, file.name);
            
           this.customerService.uploadCuctomerPicture(formData)
                .subscribe(
                    data => {
                      console.log(data)
                      console.log(data.Data);
                      this.CustomerPhoto=data.Data[0].Path;
                      console.log(data.Data)
                      console.log(data.Data[0].Path)
                  
                     
                  });
                
        }
      }
    // testLocalStorage(){
    //     this.localStorageService.remove("userToken");

    // }
    logout() {
        this.customerService.logout();
        this.autoLoginService.signOut().subscribe(res => res);
    }
    resendConfirmationEmail() {
        let title: string = "تم اعادة ارسال ايميل التاكيد ";
        this.sendNotification.emit({ Type: 1, Title: title, Content: '' });
    }
    signoutFromAll() {
        this.customerService.signoutFromAll().subscribe(res => {
            if (res.Data == true) {
                this.customerService.logout();
                this.router.navigateByUrl("/login")

            }
        })
    }
}

