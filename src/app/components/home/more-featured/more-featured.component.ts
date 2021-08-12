import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductViewModel } from '../../shared/product/product-view-model';
import { ProductService } from '../../product/product-grid/product.service';
import { CustomerCartService } from 'src/app/shared/services/cart.service';
import { SnotifyService } from 'ng-snotify';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/shared/services/account/customer.service';
import { WishListService } from '../../customer/wish-list/wish-list.service';
import { NotificationsService } from 'angular2-notifications';
import {PageEvent, MatDialog} from '@angular/material';
import { LocalStorageService } from 'angular-2-local-storage';
import { ProductDetailsPopupComponent } from '../../product-details-popup/product-details-popup.component';

@Component({
  selector: 'app-more-featured',
  templateUrl: './more-featured.component.html',
  styleUrls: ['./more-featured.component.css']
})
export class MoreFeaturedComponent implements OnInit {
  @Output() sendNotification: EventEmitter<object> = new EventEmitter();
  featuredProducts: ProductViewModel[] = [];
  skip:number=1;
  pageSize:number=9; 
  Records:number;
  lang:string;

  constructor(private productService: ProductService,
    private snotifyService: SnotifyService,
    private route: Router,
    private cartService: CustomerCartService,
    private localStorageService : LocalStorageService,  
    private customerService: CustomerService,
    private wishlistService: WishListService,
    private _notificationsService: NotificationsService,
    public dialog: MatDialog
    ) { 
      this.lang=this.localStorageService.get("lang");

  }

  ngOnInit() {
    this.getFeaturedProducts();
  }


  getFeaturedProducts(event?:PageEvent) {
    this.ChangePage(event);
    console.log(event)
    this.productService.getNewFeaturedProducts(this.skip,this.pageSize).subscribe((response) => {
      if(response.Success)
      {
      console.log('////////////////////////////////////////')
      console.log(response.Data.Result)
      console.log('////////////////////////////////////////')
      this.featuredProducts = response.Data.Result
      this.featuredProducts.forEach(product => {
        // product.AddedToCart = this.cartService.isProductExist(product.ID);

      });
      console.log(response.Data)
      this.Records=response.Data.Records;
      console.log(this.Records)
    }
  });
  
  }

  
  ChangePage(event?:PageEvent)
  {
    console.log(event);   
    if(event!=null)    
    {
      this.Records=event.length;  
      if((event.length/event.pageSize)>=event.pageIndex)
      {
        this.skip=event.pageIndex+1;        
        console.log("event.length/event.pageSize");        
        console.log(event.length/event.pageSize)
        console.log(this.skip);
      }        
      else if(event.previousPageIndex>event.pageIndex)   
      {
        this.skip=event.pageSize*(event.previousPageIndex-1);  
        console.log(this.skip);        
      }
      else
      {
        this.skip=event.pageSize*(event.previousPageIndex+1);  
        console.log(this.skip);     
      }   
      this.pageSize=event.pageSize;   
    }
    else
    {
      this.skip=1;
      this.pageSize=9;      
    }
  }
  addToCart(product: ProductViewModel) {
    console.log(product)
    console.log("Add to cart" + JSON.stringify(product))
    product.AddedToCart = true;
    console.log(product);
    // this.cartService.addProduct(product);
    let Content=(this.lang=="ar")?"تم اضافة " + product.Name + " لعربة التسوق ":product.Name+" has been added to Cart";

    var msg1=(this.lang=="ar")?"اكمال عملية الشراء":" Complete the purchase";
    var msg2=(this.lang=="ar")?"تابع التسوق":"Continue shoppin";
    this.snotifyService.success(Content, "", {
      timeout: 3000,
      showProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      
      buttons: [
        { text:msg1, action: (toast) => { this.route.navigateByUrl("/cart"); this.snotifyService.remove(toast.id); }, bold: false },
        { text:msg2, action: (toast) => { this.snotifyService.remove(toast.id); }, bold: false },
      ]
    });

  }
  removeFromCart(product: ProductViewModel) {
    product.AddedToCart = false;
    // this.cartService.removeProduct(product.ID);
    let Content=(this.lang=="ar")?" تم حذف " + product.Name + " من عربة التسوق ":product.Name+" has been Deleted From Cart";
    this.snotifyService.error(Content,"", {
      timeout: 3000,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
    });

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
          let title=(this.lang=="ar")?" تم حذف  " + product.Name + "من القائمة المفضلة  ":product.Name +" has been Deleted From Favourite List";
          this.sendNotification.emit({ Type: 2, Title: title, Content: '' });
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
        this.sendNotification.emit({ Type: 1, Title: title, Content: '' });
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
