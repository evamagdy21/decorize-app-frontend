
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProductViewModel } from '../../shared/product/product-view-model';
import { WishListService } from './wish-list.service';
import { NotificationsService } from 'angular2-notifications';
import { CustomerService } from '../../../shared/services/account/customer.service';
import { CustomerCartService } from '../../../shared/services/cart.service';
import { LocalStorageService } from 'angular-2-local-storage';
import {MatDialog} from '@angular/material';
import { ProductDetailsPopupComponent } from '../../product-details-popup/product-details-popup.component';


@Component({
    moduleId: module.id,
    selector: 'wish-list',
    templateUrl: './wish-list.component.html',
    styleUrls: ['./wish-list.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class WishListComponent implements OnInit {
    userName: string = "";
    wishListProducts: ProductViewModel[] = [];
    lang:string;
    constructor(
        private activatedRoute: ActivatedRoute,
        private route: Router,
        private notificationsService: NotificationsService,
        private wishListService: WishListService,
        private cartService: CustomerCartService,
        private customerService: CustomerService,
        private localStorageService : LocalStorageService,   
        private _notificationsService: NotificationsService,
        public dialog: MatDialog
        ) {
//        this.userName = localStorage.getItem("userName");
        this.userName = this.localStorageService.get("userName");
        this.lang=this.localStorageService.get("lang");
        
    }
    ngOnInit() {
    
        this.wishListService.get().subscribe(response => {
            if (response.Success) {
                this.wishListProducts = response.Data;
                console.log(this.wishListProducts);
                this.checkExistance(this.wishListProducts);
            }
        });
    }

    checkExistance(products: ProductViewModel[]) {
        products.forEach(prod => {
            if (this.wishListService.isProductExist(prod.ID))
                prod.AddedToWishlist = true;
        })
    }
    addToCart(product: ProductViewModel) {
        //console.log("product : " + JSON.stringify(product));
        product.AddedToCart = true;

        this.cartService.addToCart(product);
        let title=(this.lang=="ar")?"تم اضافة " + product.Name + " لعربة التسوق ":product.Name+" has been added to Cart";
    }
    removeFromCart(product: ProductViewModel) {
        product.AddedToCart = false;
        this.cartService.removeProduct(product.ID);
        let title=(this.lang=="ar")?"تم حذف " + product.Name + " من عربة التسوق ":product.Name+" has been Deleted From Cart";
        
    }
    RemoveFromWishList(product: ProductViewModel) {
   
        console.log(product)
        if (product.AddedToWishlist) {
     
            product.AddedToWishlist = !product.AddedToWishlist;
            this.wishListService.RemoveItemFromWishList(product.ID);
            this.wishListService.removeProduct(product.ID).subscribe(response => {
                if (response.Success) {
                   
                    this.wishListProducts = this.wishListService.getItems();
                    this.checkExistance(this.wishListProducts);
                    // alert(this.wishListProducts);
                    let title=(this.lang=="ar")?"تم حذف " + product.Name + "من القائمة المفضله":product.Name+" has been Deleted From Wish List";
                    
                    //let title: string = "تم حذف " + product.Name + " من المفضلة ";
                }
                else
                {   
                
                    product.AddedToWishlist = !product.AddedToWishlist;
                    this.wishListService.AddItemToWishList(product);
                }
            });
        }
        else {
         
            product.AddedToWishlist = !product.AddedToWishlist;
            this.wishListService.create(product.ID).subscribe(response => {
                if (response.Success) {
                    this.wishListService.AddItemToWishList(product);
                    let title=(this.lang=="ar")?"تم اضافة " + product.Name + " للقائمة المفضلة ":product.Name+" has been added to Wish List";
                  
                }
                else
                    product.AddedToWishlist = !product.AddedToWishlist;
            });

        }


        let wishlistitemcount =this.wishListService.getItems();
        if(wishlistitemcount.length <=0)
        {
            this.route.navigate(['/home'])
        }
    }
    showSuccessNotification(title: string, content: string = "") {
        this.notificationsService.success(
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
        this.notificationsService.error(
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
            this.showSuccessNotification(event.Title, event.Content);
        }
        else {
            this.showErrorNotification(event.Title, event.Content);
        }

    }

    addToWishList(product){
        this.wishListService.create(product).subscribe(Response=>{
            if(Response.Success){
                this.wishListService.AddItemToWishList(product);
                let title=(this.lang=="ar")?"تم اضافة " + product.Name + " للقائمة المفضلة ":product.Name+" has been added to Wish List";
                let header=(this.lang=="ar")?"قائمتي المفضلة":"My Wish List"
                this.showSuccessNotification(header,title);
            }
        })
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

