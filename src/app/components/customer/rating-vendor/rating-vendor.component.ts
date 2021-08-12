
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductViewModel } from '../../shared/product/product-view-model';
import { NotificationsService } from 'angular2-notifications';
import { ratingVendorViewModel } from './rating-vendor-view-model';
import { RatingVendorService } from './rating-vendor.service';
import { LocalStorageService } from 'angular-2-local-storage';



@Component({
    moduleId: module.id,
    selector: 'rating-vendor',
    templateUrl: './rating-vendor.component.html',
    styleUrls: ['./rating-vendor.component.css']
})
export class RatingVendorComponent implements OnInit {
    userName: string = "";
    value:number=5;
    review:string="";
    orderItemId:number=0;
    isAddedSuccessfully:boolean=false;
    code:string="";
    rating:ratingVendorViewModel=new ratingVendorViewModel();
    constructor(
        private activatedRoute: ActivatedRoute,
        private route: Router,
        private ratingService: RatingVendorService,
        private localStorageService: LocalStorageService) {

      //  this.userName = localStorage.getItem("userName");
        this.userName = this.localStorageService.get("userName");
        
           
            
    }
    ngOnInit() {
        this.activatedRoute.queryParams
        .filter(params => params.code)
        .subscribe(params => {
          console.log(params); 
  
          this.code = params.code;
          this.isRatedBefore();
          console.log(this.code); 
        });
          
        this.value=5;
       

    }
    isRatedBefore(){
        this.ratingService.IsRatedBefore(this.code).subscribe(response=>{
            if(response.Success && response.Data != true){
                // this.route.navigateByUrl("/orders");
            }else if(response.Success && response.Data == true){
                    //do nothing
            }else{
                //this.route.navigateByUrl("/orders");                
            }
        })
    }
    save(){
        this.rating.Review=this.review;
        this.rating.Code=this.code;
        this.rating.RatingCount=this.value;
        this.ratingService.AddRating(this.rating).subscribe(res=>{
            if(res.Success)
            {
                this.isAddedSuccessfully=true;
            }
        });
    }
}

