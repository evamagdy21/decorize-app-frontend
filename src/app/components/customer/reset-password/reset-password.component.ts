import { ResultViewModel } from './../../../shared/view-models/result-view-models';

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit } from '@angular/core';
import { Customer } from "../../../shared/view-models/customer-model";
import { Router, ActivatedRoute } from "@angular/router";
import { CustomerService } from "../../../shared/services/account/customer.service";
import { Patterns } from "../../../common/patterns";
import { ResetPasswordViewModel } from "./reset-password-view-model";
import { ValidatorFn } from "@angular/forms";
import { AbstractControl } from "@angular/forms";

@Component({
    moduleId: module.id,
    selector: 'reset-password',
    templateUrl: 'reset-password.component.html',
    styleUrls: ['reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
    form: FormGroup;
    model: ResetPasswordViewModel = new ResetPasswordViewModel();
    resetSuccess: boolean = false;
    isInvalidUser: boolean = false;
    userCode: string = "";
    resetFailed: boolean = false;
    processing: boolean = false;
    resultViewModel: ResultViewModel;
    constructor(private activatedRoute: ActivatedRoute, private formbuilder: FormBuilder, private route: Router, private customerService: CustomerService) { }
    ngOnInit() {

        this.createForm();
        this.activatedRoute.paramMap.subscribe(parms => {
            this.userCode = parms.get('code');
            this.model.Code = this.userCode;
            this.customerService.validateCode(this.model).subscribe(res => {

                if (res.Success == false) {
                    this.route.navigateByUrl("/forget-password");
                }
            });
            //console.log("this.userCode : " + this.userCode);
        });
    }
    createForm(): void {
        this.form = this.formbuilder.group({
            Password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
            ConfirmPassword: ['', [Validators.required,this.equalto('Password')]],
        });
    }

    equalto(field_name): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
          let input = control.value;
          let isValid = control.root.value[field_name] == input
          if (!isValid)
            return { 'equalTo': { isValid } }
          else
            return null;
        };
      }
    save(): void {
        // //console.log(this.form.controls["Password"].value);
        //let account = Object.assign({}, this.model, this.form.value) as Customer;
        // this.model.OldPassword=this.form.controls["OldPassword"].value;
        this.processing = true;
        this.model.NewPassword = this.form.controls["Password"].value;
        this.customerService.ResetPassword(this.model).subscribe((response) => {
            // alert("response : " + JSON.stringify(response));
            this.processing = false;
            this.resultViewModel = response;
            if (response.Success) {
                this.resetSuccess = true;
            }
            else {
                this.resetFailed = true;
            }
            // setTimeout(() => {
            //     this.route.navigateByUrl("/login");
            // }, 3000);
        });
    }
}

