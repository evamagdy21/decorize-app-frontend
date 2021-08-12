import { ResultViewModel } from './../../../shared/view-models/result-view-models';

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit } from '@angular/core';
import { Customer } from "../../../shared/view-models/customer-model";
import { Router } from "@angular/router";
import { CustomerService } from "../../../shared/services/account/customer.service";
import { Patterns } from "../../../common/patterns";


@Component({
    moduleId: module.id,
    selector: 'acivate-email',
    templateUrl: 'index.component.html',
    styleUrls: ['index.component.css']
})
export class IndexComponent implements OnInit {
    form: FormGroup;
    model: Customer;
    isInvalidUser: boolean = false;
    resultViewModel: ResultViewModel;
    processing: boolean = false;
    done: boolean = false;
    successSend: boolean = false;
    constructor(private formbuilder: FormBuilder, private route: Router, private customerService: CustomerService) { }
    ngOnInit() {
    }



    save(): void {
        this.processing = true;
        this.customerService.activateEmail().subscribe((response) => {
            this.resultViewModel = response;
            this.done = true;
        });
    }
}

