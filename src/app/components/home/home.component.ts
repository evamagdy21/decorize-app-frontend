import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { Component, Output, EventEmitter, OnInit, ViewEncapsulation, Input } from '@angular/core';

import { Title } from '@angular/platform-browser';
import { CustomerCartService } from '../../shared/services/cart.service';
import { ProductService } from '../product/product-grid/product.service';
import { FeaturedCategoryViewModel } from '../product/featured-category-view-model';
import { SnotifyService } from 'ng-snotify';
import { Alert } from 'selenium-webdriver';
import { ProductSearchViewModel } from './homeProductViewModel';
import { CustomerService } from 'src/app/shared/services/account/customer.service';
import { WishListService } from '../customer/wish-list/wish-list.service';
import { ProductViewModel } from '../shared/product/product-view-model';
import { ItemSearchViewModel } from '../shared/product/item-search-view-model';
import { LocalStorageService } from 'angular-2-local-storage';
import { ProductDetailsPopupComponent } from '../product-details-popup/product-details-popup.component';
import { MatDialog, MatDialogRef } from '@angular/material';

import { TokenService } from '../../shared/services/token.service';

@Component({
  moduleId: module.id,
  selector: 'home-page',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  lang: string;
  @Output() sendNotification: EventEmitter<object> = new EventEmitter();
  @Input() product: any;
  @Input() featuredProducts:any;
  @Input() bestDailyOffers: any;
  @Output() productAdded = new EventEmitter();
  AddedToCart:false;
  AddedToWishlist:false;
  cartQTY: number;
  constructor(title: Title, private snotifyService: SnotifyService,
    private route: Router, private cartService: CustomerCartService,
    private productService: ProductService,
    private customerService: CustomerService,
    private wishlistService: WishListService,
    private _notificationsService: NotificationsService,
    private localStorageService: LocalStorageService,
    public dialog: MatDialog,
    private tokenStorage: TokenService
  ) {
    title.setTitle("Decorize  - الصفحة الرئيسية");
    this.lang = this.localStorageService.get("lang");
    this.featuredProducts = this.productService.getFeaturedProducts();
    this.bestDailyOffers = this.productService.getOffers();
  }


  featuredCategories: FeaturedCategoryViewModel[] = [];
  ngOnInit() {
    this.cartService.getCartLength().subscribe(res => {
      this.cartQTY = res;

      
    });
  }

  WishListcheckExistance(product: ProductViewModel) {

    if (this.wishlistService.isProductExist(product.ID)) { product.AddedToWishlist = true; }
  }
  showSuccessNotification(title: string, content: string = "") {
    this._notificationsService.success(
      title,
      content,
      {
        timeOut: 2000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: true,
        maxLength: 3
      }
    );
  }
  showErrorNotification(title: string, content: string = "") {
    // alert(title);
    this._notificationsService.error(
      title,
      content,
      {
        timeOut: 2000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: true,
        maxLength: 3
      }
    );
  }
  showNotification(event) {

    if (event.Type == 1) {
      this.snotifyService.success(event.Content, event.Title, {
        timeout: 3000,
        showProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        buttons: [
          { text: 'اكمال عملية الشراء', action: (toast) => { this.route.navigateByUrl("/cart"); this.snotifyService.remove(toast.id); }, bold: false },
          { text: 'تابع التسوق', action: (toast) => { this.snotifyService.remove(toast.id); }, bold: false },
        ]
      });
    }
    else {
      this.snotifyService.error(event.Content, event.Title, {
        timeout: 3000,
        showProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });

    }




  }


  addToCart(product) {
   ++this.cartQTY
    this.cartService.addToCart(product);
  
    product.AddedToCart = true;
    let Content = (this.lang == "ar") ? "تم اضافة " + product.Name + " لعربة التسوق " : product.Name + " has been added to Cart";
    var msg1 = (this.lang == "ar") ? "اكمال عملية الشراء" : " Complete the purchase";
    var msg2 = (this.lang == "ar") ? "تابع التسوق" : "Continue shoppin";
    this.snotifyService.success(Content, "", {
      timeout: 3000,
      showProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,

      buttons: [
        { text: msg1, action: (toast) => { this.route.navigateByUrl("/cart"); this.snotifyService.remove(toast.id); }, bold: false },
        { text: msg2, action: (toast) => { this.snotifyService.remove(toast.id); }, bold: false },
      ]
    });

  }
  
  removeFromCart(product: ProductViewModel) {
    --this.cartQTY
    product.AddedToCart = false;
    this.cartService.removeProduct(product.ID);

    let Content = (this.lang == "ar") ? "  تم حذف " + product.Name + "من عربة التسوق " : product.Name + " has been Deleted From Cart";

    this.snotifyService.error(Content, "", {
      timeout: 3000,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
    });

  }

  removeFromWishList(product: ProductViewModel) {
    product.AddedToWishlist=false;
    if (!this.customerService.hasAccessToken()) {
      this.sendNotification.emit({ Type: 2, Title: 'قم بتسجيل الدخول أولاً.', Content: '' });
      return;
    }
    if (product.AddedToWishlist) {
      this.wishlistService.removeProduct(product.ID).subscribe(response => {
        if (response.Success) {
          this.wishlistService.RemoveItemFromWishList(product.ID);
          let title = (this.lang == "ar") ? "  تم حذف  " + product.Name + "  من القائمة المفضلة" : product.Name + " has been Deleted From Favourite List";
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
    product.AddedToWishlist=true;
    if (!this.tokenStorage.getToken()) {

      this.route.navigateByUrl("/login");
      this.sendNotification.emit({ Type: 2, Title: 'قم بتسجيل الدخول أولاً.', Content: '' });
      return;
    }
    if (!product.AddedToWishlist) {



      this.wishlistService.create(product.ID).subscribe(response => {

        this.wishlistService.AddItemToWishList(product);
        let title = (this.lang == "ar") ? " تم إضافة  " + product.Name + " إلي القائمة المفضله " : product.Name + " has been Added To  Favourite List";
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
  }
  ProductDetails(productID) {
    const dialogRef = this.dialog.open(ProductDetailsPopupComponent, {
      data: productID,
      width: '1000px',
    });
    dialogRef.afterClosed().subscribe(result => {
 
    })
  }
}

