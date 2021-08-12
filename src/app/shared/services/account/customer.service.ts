import { ApiService } from './../api.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { ResultViewModel } from '../../view-models/result-view-models';
import { Customer } from '../../view-models/customer-model';
import { ResetPasswordViewModel } from '../../../components/customer/reset-password/reset-password-view-model';
import { WishListService } from '../../../components/customer/wish-list/wish-list.service';
import { CustomerEditViewModel } from '../../../components/customer/profile-edit/customer-edit-view-model';
import { PasswordEditViewModel } from '../../../components/customer/password-edit/password-edit-view-model';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    getUser(): any {
        // GetByToken
        return this.apiService.get('/customer/GetByToken');
    }

    private subject = new BehaviorSubject<boolean>(this.hasAccessToken());
    private Namesubject = new BehaviorSubject<any>(this.getUserName());
    constructor(private localStorageService: LocalStorageService, private apiService: ApiService, private wishListService: WishListService) {
        // let logged:boolean;
        // this.isLogged().subscribe(x=>logged=x);
        // //console.log("logged : "+logged);
        // this.changeLoggedStatus(true);
    }

    private changeLoggedStatus(logged: boolean) {
        this.subject.next(logged);
    }

    private getUserName() {
        return this.localStorageService.get("userName");
    }


  uploadCuctomerPicture(body:object)
  {
    
    return this.apiService.upload('/Account/UploadProfileImg',body);
  }
    
  activateEmail() {
        return this.apiService.get(`/customer/GetResendEmailConfirmation`).map(data => data);

    }

    logout() {
        this.localStorageService.remove("userToken");
        this.localStorageService.remove("userName");


        //  localStorage.removeItem("userToken");
        //  localStorage.removeItem("userName");
        this.wishListService.clearWishList();
        this.changeUserName(" ");
        this.changeLoggedStatus(false);
    }

    signoutFromAll() {
        return this.apiService.get(`/user/SignOutFromAll`).map(data => data);

    }
    hasAccessToken(): boolean {
        return (this.localStorageService.get("userToken") != null && JSON.stringify(this.localStorageService.get("userToken")).length > 0)
    }
    confirmAccount(code: string) {
        return this.apiService.get(`/customer/GetConfirmAccount?code=${code}`).map(data => data);

    }
    isLogged(): Observable<boolean> {
        return this.subject.asObservable();
    }
    private changeUserName(userName) {
        this.Namesubject.next(userName);
    }

    UserName(): Observable<string> {
        return this.Namesubject.asObservable();
    }
    create(customer: Customer): Observable<ResultViewModel> {
        return this.apiService.post('/customer/register', customer).map(data => data).do(data => {
            // //console.log('result: ' + JSON.stringify(data));
            if (data.Success && data.Data.AccessToken != null && data.Data.AccessToken.length > 0) {
                // alert(data.Data.AccessToken);

                this.localStorageService.set("userToken", data.Data.AccessToken);
                this.localStorageService.set("userName", data.Data.Name);
                this.changeUserName(data.Data.Name);
                this.changeLoggedStatus(true);
            }
        });
    }
    createFacebookAccount(code: string): Observable<ResultViewModel> {
        return this.apiService.get(`/customer/GetCreateFacebookAccount?code=${code}`).map(data => data).do(data => {
            // //console.log('result: ' + JSON.stringify(data));
            if (data.Success && data.Data.AccessToken != null && data.Data.AccessToken.length > 0) {
                // alert(data.Data.AccessToken);
                this.localStorageService.set("userToken", data.Data.AccessToken);
                this.localStorageService.set("userName", data.Data.Name);
                this.changeUserName(data.Data.Name);
                this.changeLoggedStatus(true);
            }
        });
    }

    update(customer: CustomerEditViewModel): Observable<ResultViewModel> {
        //console.log(JSON.stringify(customer));
        return this.apiService.update('/customer/PUT', customer).map(data => data).do(data => {
            this.localStorageService.set("userName", customer.Name);
            this.changeUserName(customer.Name);
        });
    }

    updatePassword(model: PasswordEditViewModel): Observable<ResultViewModel> {
        return this.apiService.update('/customer/PutResetPassword', model);
    }

    ChangePassword(model: PasswordEditViewModel): Observable<ResultViewModel> {
    
        return this.apiService.update('/Account/ChangePassword', model);
    }
    callFacebook(): Observable<ResultViewModel> {
        return this.apiService.get('/home/CreateAccessToken').map(data => data)
    }
    login(customer: Customer): Observable<ResultViewModel> {
        return this.apiService.post('/user/login', customer).map(data => data)
            .do(data => {
                //console.log('result: ' + JSON.stringify(data));
                // debugger
                if (data.Success && data.Data.AccessToken != null && data.Data.AccessToken.length > 0) {
                    // alert(data.Data.AccessToken);
                    this.localStorageService.set("userToken", data.Data.AccessToken);
                    this.localStorageService.set("userName", data.Data.Name);
                    this.changeUserName(data.Data.Name);
                    this.changeLoggedStatus(true);
                }
            });
    }

    forgetPassword(customer: Customer): Observable<ResultViewModel> {
        // alert("in api service")
        return this.apiService.post('/customer/ForgetPassword', customer);
    }

    ResetPassword(customer: ResetPasswordViewModel): Observable<ResultViewModel> {
        // //console.log(customer);
        return this.apiService.update(`/customer/PutResetPassword`, customer);
    }
    initializeAccount(): Customer {
        return {
            ID: 0,
            Guid: "",
            Name: "",
            Mobile: "",
            Email: "",
            Address: "",
            Password: "",
            UserName: "",
            Image: "",
            LoginVia:""
        };
    }

    validateCode(model: ResetPasswordViewModel): any {
        return this.apiService.post(`/customer/ValidateResetPassword`, model);
    }
    LoginByFacebook(token: string) {
        // alert("in login service");
        return this.apiService.get(`/user/CheckUserData?code=${token}`).map(data => data)
            .do(data => {
                //console.log('result: ' + JSON.stringify(data));
                debugger
                if (data.Success && data.Data.AccessToken != null && data.Data.AccessToken.length > 0) {
                    //  alert(data.Data.AccessToken);

                    //  localStorage.setItem("userToken", data.Data.AccessToken);
                    //  localStorage.setItem("userName", data.Data.Name);
                    this.localStorageService.set("userToken", data.Data.AccessToken);
                    this.localStorageService.set("userName", data.Data.Name);
                    this.changeUserName(data.Data.Name);
                    this.changeLoggedStatus(true);
                }
            });


    }
}