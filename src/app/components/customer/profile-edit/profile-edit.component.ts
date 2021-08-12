
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit } from '@angular/core';
import { Customer } from '../../../shared/view-models/customer-model';
import { CustomerService } from '../../../shared/services/account/customer.service';
import { Patterns } from '../../../common/patterns';
import { CustomerEditViewModel } from './customer-edit-view-model';
import { ResultViewModel } from '../../../shared/view-models/result-view-models';


@Component({
    moduleId: module.id,
    selector: 'app-profile-edit',
    templateUrl: './profile-edit.component.html',
    styleUrls: ['./profile-edit.component.css']
})

export class ProfileEditComponent implements OnInit {
    form: FormGroup;
    CustomerPhoto:string;
    model: CustomerEditViewModel;
    resultViewModel: ResultViewModel;
    errors:any=[];
    constructor(private formbuilder: FormBuilder,
        private title: Title,
        private customerService: CustomerService) {
        title.setTitle("تعديل الحساب ");
    }
    ngOnInit() {
        this.model = this.customerService.initializeAccount();
        this.customerService.getUser().subscribe(response => {
            if (response.Success) {
             
                this.model = response.Data;
                this.bind();
                console.log(response.Data)
                this.CustomerPhoto=response.Data.profileImg
            }
           
        });
        this.createForm();
    }

    bind() {
        this.form.patchValue({
            "Name": this.model.Name,
            "Mobile": this.model.Mobile,
            "Email": this.model.Email
        });
    }
    createForm(): void {
        this.form = this.formbuilder.group({
            Name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
            Email: ['', [Validators.required, Validators.pattern(Patterns.Email)]],
            Mobile: ['', [Validators.required, Validators.pattern(Patterns.PhoneMobile), Validators.minLength(8),Validators.maxLength(16)]],
            
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
    save(): void {
        let account = Object.assign({}, this.model, this.form.value) as CustomerEditViewModel;
        this.customerService.update(account).subscribe((response) => {
            if(response.Success)
            {
                this.resultViewModel = response;
            }
            else
            {
                this.resultViewModel = response;
                this.errors=response.Errors
            }
            // alert("response : " + JSON.stringify(response));
       
            //console.log(this.resultViewModel);
        });
    }
}

