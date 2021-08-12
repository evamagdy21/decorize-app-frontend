
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit } from '@angular/core';
import { Customer } from "../../../shared/view-models/customer-model";
import { Router } from "@angular/router";
import { CustomerService } from "../../../shared/services/account/customer.service";
import { Patterns } from "../../../common/patterns";
import { ResultViewModel } from "src/app/shared/view-models/result-view-models";

@Component({
    moduleId: module.id,
    selector: 'forget-password',
    templateUrl: 'forget-password.component.html',
    styleUrls: ['forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
    form: FormGroup;
    model: Customer;
    resultViewModel : ResultViewModel;
    isInvalidUser: boolean = false;
    successSend: boolean = false;
    processing: boolean = false;
    constructor(private formbuilder: FormBuilder, private route: Router, private customerService: CustomerService) { }
    ngOnInit() {

        this.createForm();
    }
    createForm(): void {
        this.form = this.formbuilder.group({

            Email: ['', [Validators.required, Validators.pattern(Patterns.Email)]]
        });
    }


    save(): void {
        // //console.log("form : " + JSON.stringify(this.form.value));
        this.processing = true;
        let account = Object.assign({}, this.model, this.form.value) as Customer;
        // alert("in forget password");
        this.customerService.forgetPassword(account).subscribe((response) => {
            //alert("response : " + JSON.stringify(response));
          //  if (response.Success) {
                this.processing = false;
                this.resultViewModel = response;
           //     this.successSend = true;
           // }
            // this.route.navigateByUrl("/reset-password");
        },err=>{
            this.processing = false;
            this.resultViewModel = err;
            console.log(this.resultViewModel);
        });
    }
}

