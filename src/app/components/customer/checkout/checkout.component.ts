import { shippingAddressService } from './../shipping-address/shipping-address.service';
import { environment } from './../../../../environments/environment';
import { ShippingRegionViewModel } from '../cart/shipping-region.model';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit } from '@angular/core';
import { CustomerCartService } from '../../../shared/services/cart.service';
import { SelectItem } from '../../../shared/view-models/select-view-model';

import { OrderCreateViewModel } from './order-create-view-model.model';
import { CustomerService } from '../../../shared/services/account/customer.service';
import { ResultViewModel } from '../../../shared/view-models/result-view-models';
import { CheckoutService } from './checkout.service';
import { OrderPostResultViewModel } from './order-post-result.model';
import { Observable } from 'rxjs';
import { ShippingAddressViewModel } from '../shipping-address/shipping-address-view-model.model';
import { Patterns } from 'src/app/common/patterns';
import { CartItem } from 'src/app/shared/view-models/cart-item-model';
import { CustomerShippingAddressListViewModel } from '../shipping-address/Customer-Shopping-Address-view-model';
import { SnotifyService } from 'ng-snotify';

@Component({
    moduleId: module.id,
    selector: 'checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
    count: number = 0;
    validShoppingAddress:boolean=false;
    validPaymentMethodID:boolean=false
    totalPrice: number = 0;
    cartProducts: CartItem[] = [];
    CustomerAddressList:CustomerShippingAddressListViewModel[]=[]
    form: FormGroup;
    InvalidCart: boolean = false;
    processing: boolean = false;
   
    shippingRegions: ShippingRegionViewModel[] = [];
    AddedSuccefully: boolean = false;
    resultViewModel: ResultViewModel;
    isSaving: boolean = false;
    isPageLoaded: boolean = false;
    order: OrderCreateViewModel = new OrderCreateViewModel();
    shippingCost:number;
    shippingAddressID:number=0;
    PaymentMethodType:number=0;
    adress:CustomerShippingAddressListViewModel=new CustomerShippingAddressListViewModel();
    constructor(private formbuilder: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private route: Router,
        private title: Title,
        private cartservice: CustomerCartService,
        private checkoutService: CheckoutService,
        private customerService: CustomerService,
        private snotifyService: SnotifyService, 
        private shippingAddressService: shippingAddressService) {

    }
    ngOnInit() {
    
        this.validate();
        // this.cartservice.getCartLength().subscribe(res=>{
        //   this.count=res;
        // }); 
        // this.order.ProductsCost = this.cartservice.calcTotalPrice();
        // if (this.order.ProductsCost <= 0)
        //     this.route.navigateByUrl("/");
         this.initializePage();

    }
     getDimensionsByFind(id){
        return this.CustomerAddressList.find(item => item.ID === id);
      }
    changeSoppingAddress()
    {
      
       
        if(this.shippingAddressID!=0 )
        {
           this.validShoppingAddress=true;
        }

       this.adress= this.CustomerAddressList.find(item => item.ID ==this.shippingAddressID);
       console.log('Addressfffffffffffffffffffffffffffffffffffff')
       console.log(  this.adress)
    }
    changePaymentMethod()
    {
        if(this.PaymentMethodType ==1 ||this.PaymentMethodType ==2)
        {
           this.validPaymentMethodID=true;
        }

    }


    
    initializePage() {
       
        this.shippingAddressService.getAllShoppingAddresses().subscribe(res => {
            if(res.Success)
            {
               
                this.CustomerAddressList=res.Data
            }
    
                this.isPageLoaded = true;
                console.log('asddddddddddddddddddddddddddd')
                console.log( this.CustomerAddressList)

    });
}


    disabledSubmit() {
        return this.isSaving || !this.form.valid || this.order.ProductsCost <= 0;
    }


    getvalue()
    {   console.log('cart shippingAddressID **********************************************************');
       // alert(this.PaymentMethodType);
    }
    // validate() {
    //     this.cartProducts = this.cartservice.getItems();
    //     console.log('cart items **********************************************************');
    //     console.log(this.cartProducts);
    //     this.cartservice.validate().subscribe(res => {
    //      // this.cartservice.clearCart();
    //       if (!res.Success || res.Data.NotValidProducts.length > 0) {
    //             this.InvalidCart = true;
    //             this.route.navigateByUrl("/");
    //       } 
    //       else {
         
              
    //             res.Data.ValidProducts.forEach(element => {
    //             this.cartservice.addProduct(element)
    //         });
    //        this.shippingCost = res.Data.ShippingCost;
    //         this.order.ShippingCost=res.Data.ShippingCost;
    //         this.order.Products=  this.cartProducts;
    //         this.order.CashOnDeliveryCost=0;
    //         this.order.Note="",

    //         console.log('caaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaart')
   
    //         console.log(this.cartProducts)
    //         this.getCartAmount();
   
    //       }
    //     })
    
    //   }


    validate() {
        // 

         this.cartProducts = this.cartservice.getItems();
          this.cartservice.validate().subscribe(res => {
      
            console.log('cart validation servie')
            console.log(res)
        
             if(res.Success)
             {
            
              if(res.Data.ValidProducts.length>0 && res.Data.NotValidProducts.length<=0)
              {
                
                res.Data.ValidProducts.forEach(element => {
                    element.IsValid=true;
                    // this.cartservice.addProduct(element)
                });

               this.shippingCost = res.Data.ShippingCost;
                this.order.ShippingCost=res.Data.ShippingCost;
                this.order.Products=  this.cartProducts;
                this.order.CashOnDeliveryCost=0;
                this.order.Note="",

               console.log('caaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaart')
   
                 console.log(this.cartProducts)
                this.getCartAmount();
    
              }
              else{
                 
                this.route.navigateByUrl("/cart");
              }

        }
        else{
        
            this.route.navigateByUrl("/home");
        }
     });
      
      
      
        }
      getCartAmount() {
        
        this.totalPrice = this.calcTotalPrice(this.cartProducts);
        this.order.ProductsCost=  this.totalPrice;
        console.log('cart total **********************************************************');
        console.log(this.totalPrice)
      }


      calcTotalPrice(Cart:CartItem[]): number {
        //get items from backend
       
        let totalPrice = 0;
        Cart.forEach(product => {
            totalPrice += product.Price * product.QTY;
        });


        return totalPrice

    }
    logout() {
        this.customerService.logout();
    }

 
    onPaymentMethodChanged(paymentMethodID: number) {
        this.order.PaymentMethodID = paymentMethodID;
      // this.CalculateShippingAndDeliveryCostByRegionID(this.order.ShippingAddress.RegionID);
    }


    payOnline(): void {
        location.href = "http://takhfeed.com/order/PayOnline";
        //this.checkoutService.payOnline().subscribe();
    }
    save(): void {
      
        this.order.PaymentMethodID=this.PaymentMethodType;
        this.order.ShippingAddressID=this.shippingAddressID;
        this.processing = true;
        this.isSaving = true;
        console.log('ooooooooooooooooooooooooooooooooooooooooooooooooorder')
        console.log(this.order)
        this.checkoutService.create(this.order).subscribe((response) => {
            this.processing = false;
            console.log(response);
            if (response.Success) {
                this.cartservice.clearCart();
                let orderPostResultViewModel: OrderPostResultViewModel = response.Data;
                this.resultViewModel = response;
                this.route.navigateByUrl(`order-confirmation/${orderPostResultViewModel.Number}`);             
            } else {                
                if (response.Message == "NotConfirmed") {                    
                    this.route.navigateByUrl(`/activate-email`);
                } else {                   
                        this.snotifyService.error(response.Message,"",{ timeout: 3000,
                            showProgressBar: true,
                            closeOnClick: false,
                            pauseOnHover: true});
                        //alert(response.Errors[0].Message);
                        setTimeout(()=>{    //<<<---    using ()=> syntax
                            this.route.navigateByUrl(`cart`);                   
                       }, 3000);                                                    
                }
            }

        });

       
    }
    get region() {
        return this.form.controls["Region"];
    }
    get street() {
        return this.form.controls['Street']
    }

    get buildingNumber() {
        return this.form.controls['BuildingNumber']
    }

    get flowerNumber() {
        return this.form.controls['FlowerNumber']
    }

    get flatNumber() {
        return this.form.controls['FlatNumber']
    }

    get mobile() {
        return this.form.controls['Mobile']
    }
    get longtitude() {
        return this.form.controls['Longtitude']
    }

    get latitude() {
        return this.form.controls['Latitude']
    }


    get shippingRegion() {
        return this.form.controls['RegionID']
    }

    updateCart(Cartitems:CartItem[])
    { 
         this.cartProducts = this.cartservice.getItems();
      

    }
}

