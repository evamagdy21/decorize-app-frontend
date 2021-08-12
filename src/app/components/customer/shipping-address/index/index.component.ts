
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit } from '@angular/core';
import { CustomerCartService } from '../../../../shared/services/cart.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { ShippingAddressViewModel } from '../shipping-address-view-model.model';
import { shippingAddressService } from '../shipping-address.service';
import { CustomerShippingAddressListViewModel } from '../Customer-Shopping-Address-view-model';
import { SnotifyService } from 'ng-snotify';


@Component({
    moduleId: module.id,
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

    lang:string;
    CustomerAddressesList: CustomerShippingAddressListViewModel[]=[];
    userName: string = "";
    constructor(private formbuilder: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private route: Router,
        private title: Title,
        private snotifyService: SnotifyService, 
        private cartervice: CustomerCartService,
        private localStorageService: LocalStorageService,

        private shippingAddressService: shippingAddressService) { }
    ngOnInit() {
//        this.userName = localStorage.getItem("userName");
        this.userName = this.localStorageService.get("userName");
        this.GetallCustomerShoppingAddresses()
     
    }


    GetallCustomerShoppingAddresses()
    {
        this.shippingAddressService.getAllShoppingAddresses().subscribe(response=>{
            if(response.Success){
                this.CustomerAddressesList=response.Data;
            }
        })

    }
    DelteAddress(id:number)
    {
        
        this.shippingAddressService.DeleteAddress(id).subscribe(res=>{

            if(res.Success)
            {
               
                this.snotifyService.success(res.Message, "", {
                timeout: 3000,
                showProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,});
                this.GetallCustomerShoppingAddresses();
            }
        },error=>{
            console.log(error)
        });
        
    }


}

