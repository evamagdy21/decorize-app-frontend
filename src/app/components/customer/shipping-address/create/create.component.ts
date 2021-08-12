import { shippingAddressService } from './../shipping-address.service';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit } from '@angular/core';
import { SelectItem } from '../../../../shared/view-models/select-view-model';
import { CustomerCartService } from '../../../../shared/services/cart.service';
import { LocalStorageService } from 'angular-2-local-storage/dist/local-storage.service';
import { ShippingAddressViewModel } from '../shipping-address-view-model.model';
import { CustomerShippingAddressListViewModel } from '../Customer-Shopping-Address-view-model';
import { Patterns } from 'src/app/common/patterns';
import { LocationService } from 'src/app/shared/services/location.service';
import { SnotifyService } from 'ng-snotify';



@Component({
    moduleId: module.id,
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

    form: FormGroup;
    QueryString:any;
    id:number;
  
    shippingZoneList: SelectItem[] = [];
    CountryList: SelectItem[] = [];
    CityList: SelectItem[] = [];
    AreaList: SelectItem[] = [];
    AddedSuccefully: boolean = false;
    processing: boolean = false;
    userName: string = "";
    lang:string;
    model:CustomerShippingAddressListViewModel= new CustomerShippingAddressListViewModel();
    constructor(private formbuilder: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private route: Router,
        private locationService:LocationService,
        private title: Title,
        private snotifyService: SnotifyService, 
        private cartervice: CustomerCartService,
        private localStorageService: LocalStorageService,
        private shippingAddressService: shippingAddressService) {
    
        title.setTitle("عنوانين الشحن");
        this.lang=this.localStorageService.get("lang");
        this.userName = this.localStorageService.get("userName");
        this.createForm();
    }
    ngOnInit() {
        this.QueryString = this.activatedRoute.params.subscribe(params => {
            this.id = +params['id'];
       
            if(this.id==0)
            {
                this.model=new CustomerShippingAddressListViewModel();
            }
            else{
                this.shippingAddressService.getShoppingAdressByID(this.id).subscribe(res=>{
                    if(res.Success)
                    {
                        this.model=res.Data;
                        console.log('adress byyyyyyyyyyyyyyyyyyyyyy ID');
                        console.log(this.model);
                        this.createForm();
                    }

                  
                });
            }
      
          });


        this.getCountryList();
       
    }

   
  

       createForm(): void {
        this.form = this.formbuilder.group({
            ID: [this.model.ID, []],
            Name: [this.model.Name, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
            Street: [this.model.Street, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
            BuildingNumber: [this.model.BuildingNumber, [Validators.required]],
            FlowerNumber: [this.model.FlowerNumber, [Validators.required]],
            FlatNumber: [this.model.FlatNumber, [Validators.required]],
            Longtitude: [this.model.Longtitude,[]],
            Latitude: [this.model.Latitude,[]],
            CityID: [this.model.CityID, []],
            CountryID: [this.model.CountryID, []],
            AreaID:[this.model.AreaID, [Validators.required]],
            Mobile:[this.model.Mobile,[Validators.pattern(Patterns.PhoneMobile),Validators.pattern(Patterns.OnlyNumbers), Validators.minLength(9),Validators.maxLength(16)]]
        });
    }
  

    save(): void {
        console.log("form : " + JSON.stringify(this.form.value));
        this.processing = true;
        let address = Object.assign({}, this.model, this.form.value) as ShippingAddressViewModel;
        console.log("model : " + JSON.stringify(address));

        this.shippingAddressService.postOrUpdate(address).subscribe((response) => {
            this.processing = false;
            if (response.Success) {
                this.AddedSuccefully = true;
             
               this.snotifyService.success(response.Message, "", {
                timeout: 3000,
                showProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
            
            });
                this.route.navigateByUrl("/shipping-address");

            }
        });
    }


    getCountryList() {
       
        this.locationService.getCountryList().subscribe(response => {
           if(response.Success)
           {
            this.CountryList = response.Data;


            console.log('country list ---------------------------------------------');
            console.log(this.CountryList );
            let Choose=(this.lang=="ar")?"إختر الدولة":"Choose a Country";
            this.CountryList.push({ "ID": 0, "Name": Choose, "Selected": true });
            this.CountryChange();
           }

        })
    }

    getCityList(countryID:number) {
        this.locationService.getCityList(countryID).subscribe(response => {
            if(response.Success)
            {
            this.CityList = response.Data;
            this.getAreaList(this.CityList[ this.CityList.length-1 ].ID)
            let Choose=(this.lang=="ar")?"إختر المدينة":"Choose a City";
            this.CityList.push({ "ID": 0, "Name": Choose, "Selected": true });

            this.CityChange();
            }
    });
}

    getAreaList(cityID:number) {

        this.locationService.getAreaList(cityID).subscribe(response => {
            if(response.Success)
            {
            this.AreaList = response.Data;
            let Choose=(this.lang=="ar")?"إختر المنطقة":"Choose an Area";
            this.AreaList.push({ "ID": 0, "Name": Choose, "Selected": true });
            }
    });
    }

    CountryChange()
    {
      
        console.log(this.form.controls["CountryID"].value);
        if (this.form.controls["CountryID"].value == "") {
          console.log("empty");
          this.getCityList(0);
    
        }
        else {
            this.CityList=[];
            this.AreaList=[];
          this.getCityList(this.form.controls["CountryID"].value);
       
      
        
        }
    }

    
    CityChange()
    {
       
        console.log(this.form.controls["CityID"].value);
        if (this.form.controls["CityID"].value == "") {
          console.log("empty");
       
       
    
        }
        else {
         this.AreaList=[];
         if(this.id==0)
         {
           this.form.controls["AreaID"].setValue(null);
         }
        
          this.getAreaList(this.form.controls["CityID"].value);
       
        }
    }
}

