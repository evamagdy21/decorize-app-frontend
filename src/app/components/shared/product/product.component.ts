import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductViewModel } from './product-view-model';
import { CustomerCartService } from '../../../shared/services/cart.service';
import { CustomerService } from '../../../shared/services/account/customer.service';
import { NotificationsService } from 'angular2-notifications';
import { MessageService } from '../../../shared/services/message.service';
import { WishListService } from '../../customer/wish-list/wish-list.service';
import { Router } from '@angular/router';
import {PageEvent, MatDialog} from '@angular/material';
import { LocalStorageService } from 'angular-2-local-storage';
import { SnotifyService } from 'ng-snotify';
import { ProductDetailsPopupComponent } from '../../product-details-popup/product-details-popup.component';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  isCustomerLogged: boolean = false;
  @Output() sendNotification: EventEmitter<object> = new EventEmitter();
  @Input() product: ProductViewModel;
  haveOffer: boolean = true;
  lang:string;
  constructor(

    private cartService: CustomerCartService,
    private customerService: CustomerService,
    private wishlistService: WishListService,
    private snotifyService: SnotifyService,
    private localStorageService : LocalStorageService,
    private route: Router,
    private _notificationsService: NotificationsService,
    public dialog: MatDialog
  )
   {
    this.lang=this.localStorageService.get("lang");
 
  }


  ngOnInit() {

    // if (this.wishlistService.isProductExist(this.product.ID))
    //   this.product.AddedToWishlist = true;
    // // console.log(this.product);
    // if (this.product.NewPrice > this.product.OldPrice) {
    //   // this.haveOffer = true;
    // }
  
  }
  sendProduct(product) {
    //this.sendNotification.emit({ Product:product });

  }
  // addToCart(product: ProductViewModel) {

  //   product.AddedToCart = true;

  //   this.cartService.addProduct(product);
  //   // let Content: string = "تم اضافة " + product.Name + " لعربة التسوق ";
  //   // // let content:string="استكمال"
  //   // this.sendNotification.emit({ Type: 1, Title: '', Content: Content });

  //   let Content=(this.lang=="ar")?"تم اضافة " + product.Name + " لعربة التسوق ":product.Name+" has been added to Cart";
  //   // alert(Content);
  //   var msg1=(this.lang=="ar")?"اكمال عملية الشراء":" Complete the purchase";
  //   var msg2=(this.lang=="ar")?"تابع التسوق":"Continue shoppin";
  //   this.snotifyService.success(Content, "", {
  //     timeout: 3000,
  //     showProgressBar: true,
  //     closeOnClick: false,
  //     pauseOnHover: true,
      
  //     buttons: [
  //       { text:msg1, action: (toast) => { this.route.navigateByUrl("/cart"); this.snotifyService.remove(toast.id); }, bold: false },
  //       { text:msg2, action: (toast) => { this.snotifyService.remove(toast.id); }, bold: false },
  //     ]
  //   });

  // }
  // removeFromCart(product: ProductViewModel) {
  //   product.AddedToCart = false;
  //   this.cartService.removeProduct(product.ID);


  //   // let title: string = "تم حذف " + product.Name + " من عربة التسوق ";
  //   // this.sendNotification.emit({ Type: 2, Title: title, Content: '' });
  //   let Content=(this.lang=="ar")?"  تم حذف " + product.Name + "من عربة التسوق ":product.Name+" has been Deleted From Cart";
    
  //   this.snotifyService.error(Content,"", {
  //     timeout: 3000,
  //     showProgressBar: true,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //   });
  // }


 

  addToWishList(product: ProductViewModel) {
    if (!this.customerService.hasAccessToken()) {

      this.route.navigateByUrl("/login");
      this.sendNotification.emit({ Type: 2, Title: 'قم بتسجيل الدخول أولاً.', Content: '' });
      return;
    }
    if (!product.AddedToWishlist) {


   
      this.wishlistService.create(product.ID).subscribe(response => {
        this.wishlistService.AddItemToWishList(product);
        let title=(this.lang=="ar")?" تم إضافة " + product.Name + "إلي القائمة المفضله ":product.Name+" has been Added To  Favourite List";
      //  this.sendNotification.emit({ Type: 1, Title: title, Content: '' });
        product.AddedToWishlist = true;
        this.snotifyService.success(title, "", {
          timeout: 3000,
          showProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          
         
        });

      });

    }
    else{
     
      
    }
  }


  removeFromWishList(product: ProductViewModel) {

    if (!this.customerService.hasAccessToken()) {
      this.sendNotification.emit({ Type: 2, Title: 'قم بتسجيل الدخول أولاً.', Content: '' });
      return;
    }
    if (product.AddedToWishlist) {
      this.wishlistService.removeProduct(product.ID).subscribe(response => {
        if(response.Success)
        {
          this.wishlistService.RemoveItemFromWishList(product.ID);
          let title=(this.lang=="ar")?" تم حذف  " + product.Name + "من القائمة المفضلة ":product.Name+" has been Deleted From Favourite List";
         // this.sendNotification.emit({ Type: 2, Title: title, Content: '' });
          product.AddedToWishlist = !product.AddedToWishlist;
         
          this.snotifyService.error(title, "", {
            timeout: 3000,
            showProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            
           
          });
        }
      });
    }
  }
  ProductDetails(productID) {
    const dialogRef = this.dialog.open(ProductDetailsPopupComponent, {
      data: productID,
      width: '1000px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('the dialog was closed')
    })
  }
}