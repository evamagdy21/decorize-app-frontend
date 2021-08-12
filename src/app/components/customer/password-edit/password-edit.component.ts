
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../shared/services/account/customer.service';
import { PasswordEditViewModel } from './password-edit-view-model';
import { ResultViewModel } from '../../../shared/view-models/result-view-models';
import { AbstractControl } from '@angular/forms/src/model';
import { ValidatorFn } from '@angular/forms';


@Component({
    moduleId: module.id,
    selector: 'app-password-edit',
    templateUrl: './password-edit.component.html',
    styleUrls: ['./password-edit.component.css']
})

export class PasswordEditComponent implements OnInit {
    form: FormGroup;
    model: PasswordEditViewModel;
    resultViewModel: ResultViewModel;
    constructor(private formbuilder: FormBuilder, private title: Title, private customerService: CustomerService) {
        title.setTitle("تغيير كلمة السر");
    }
    ngOnInit() {
        this.createForm();
    }
    passwordMatcher(c: AbstractControl) {
        // alert("in func")
        let newPass = c.get('NewPassword');
        let confirmPass = c.get('ConfirmPassword');
        if (newPass.pristine || confirmPass.pristine) {
            return null;
        }
        if (newPass.value === confirmPass.value) {
            return null;
        }
        return { 'matchx': true };
    }

    createForm(): void {
        this.form = this.formbuilder.group({
            OldPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],

            NewPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
            ConfirmPassword: ['', [Validators.required, this.equalto('NewPassword')]]

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
        let model = Object.assign({}, this.model, this.form.value) as PasswordEditViewModel;
        this.customerService.ChangePassword(model).subscribe((response) => {
            //alert("response : "+JSON.stringify(response));
            this.resultViewModel = response;
        });
    }
}

