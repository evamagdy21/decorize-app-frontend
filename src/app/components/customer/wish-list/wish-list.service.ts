import { ApiService } from './../../../shared/services/api.service';

import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ProductViewModel } from '../../shared/product/product-view-model';
import { LocalStorageService } from 'angular-2-local-storage';
import { ProductSearchViewModel } from '../../home/homeProductViewModel';

@Injectable({
    providedIn: 'root'
})

export class WishListService {

    private subject = new BehaviorSubject<number>(this.getItems().length);
    constructor(private apiService: ApiService, private localStorageService: LocalStorageService) { }
    changeWishListLength(number) {
        // alert("changeWishListLength : " + number)
        this.subject.next(number);
    }

    clearWishList() {
        this.subject.next(0);
        this.saveWishList([]);
    }

    getWishListLength(): Observable<number> {
        return this.subject.asObservable();
    }

    isProductExist(id: number) {
        //console.log(this.getItems());
        //console.log("isProductExist : " + this.getItems().findIndex(x => x.ID== id));
        return this.getItems().findIndex(x => x.ID == id) != -1;
    }



    getItems(): any[] {
        let wishListItems: ProductViewModel[] = [];
        //let wishList = localStorage.getItem("wishList");
        // let wishList = this.localStorageService.get("wishList");
        let wishList = JSON.parse(this.localStorageService.get("wishList"))
        // alert("getItems"+JSON.parse(wishList))
        if (wishList != null) {
          
            //  wishListItems = JSON.parse(wishList) as ProductViewModel[];
            wishListItems = wishList as ProductViewModel[];
        }  
        console.log(wishList)
         console.log(wishListItems)
        return wishListItems;
     
    }

    AddItemToWishList(product: ProductViewModel) {

        let wishList = this.getItems();
        console.log(wishList)
        if (wishList.filter(x => x.ID == product.ID).length <= 0) {
            console.log('added to wish list')
            product.AddedToWishlist=true;  
            wishList.push(product);
            console.log(wishList)
        }
        else {
            console.log('removed to wish list')
            this.removeProduct(product.ID);
        }

        console.log('/////////////////////////////')
        console.log(wishList)
        console.log('/////////////////////////////')
        this.saveWishList(wishList);
        console.log('after operation')
      
    }


    RemoveItemFromWishList(id: number) {
        let wishList = this.getItems();
        let itemIndex = wishList.findIndex(x => x.ID == id);
        if (itemIndex >= 0) {
            // alert("heeeeeeeeeeeeer"+wishList)
            wishList.splice(itemIndex, 1);
            this.saveWishList(wishList);
        }
    }

    private saveWishList(wishList: any[]): void {
        // alert(JSON.stringify(wishList));
        this.changeWishListLength(wishList.length);
            //    localStorage.setItem("wishList", JSON.stringify(wishList));
        this.localStorageService.set("wishList", JSON.stringify(wishList));
    }

    get() {
        return this.apiService.get(`/CustomerWishlist/GetWishlistItems`);
    }

    create(productId: number) {
        return this.apiService.post(`/CustomerWishlist/AddWishlist?productId=${productId}`);
    }

    removeProduct(productId: number) {
        return this.apiService.remove(`/CustomerWishlist/DELETE/${productId}`);
    }
}