import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { ResultViewModel } from '../view-models/result-view-models';
import { ApiService } from './api.service';
import { CartItem } from '../view-models/cart-item-model';
import { ProductViewModel } from '../../components/shared/product/product-view-model';
import { LocalStorageService } from 'angular-2-local-storage/dist/local-storage.service';

@Injectable({
    providedIn: 'root'
})

export class CustomerCartService {

    private subject = new BehaviorSubject<number>(this.getItems().length);
    constructor(private localStorageService: LocalStorageService, private apiService: ApiService) { }

    // new functions 
    // addToCart(product) {
    //     this.items.push(product)
    // }

    clearCart() {
        let items = [];
        return items;
    }
    // old functions
    changeCartLength(number) {
        this.subject.next(number);
        //console.log("changeCartLength : " + number)
    }

    // clearCart() {
    //     this.subject.next(0);
    //     this.saveCart([]);
    // }

    getCartLength(): Observable<number> {
        return this.subject.asObservable();
    }
    getItems(): CartItem[] {

        let items = [];


        let cart = JSON.parse(this.localStorageService.get("cart"));

        if (cart != null) {

            items = cart;
        }
        // console.log("test" + JSON.stringify(items))
        return items;
    }
    private saveCart(cart: CartItem[]): void {

        // console.log('//////     BeFore Save///////////////////////////////////')
        let cart1 = this.getItems();
        // console.log(cart1)
        this.localStorageService.set("cart", JSON.stringify(cart));

        // console.log('//////    After Save///////////////////////////////////')
        let cart2 = this.getItems();
      //  console.log(cart2)
        this.changeCartLength(cart.length);
    }
    removeProduct(id: number) {
        let cart = this.getItems();
        let itemIndex = cart.findIndex(x => x.ID == id);
        if (itemIndex >= 0) {
            cart.splice(itemIndex, 1);
            this.saveCart(cart);
        }
    }

    addToCart(product: ProductViewModel) {

        let cart = this.getItems();
        console.log(cart)
        if (cart.filter(x => x.ID == product.ID).length <= 0) {

            console.log('inside push cart')
            let item = {
                IsValid: product.IsValid,
                Image: product.Image,
                Weight: product.Weight,
                Price: product.Price,
                MaxQTY: product.MaxQTY,
                Name: product.Name,
                ID: product.ID,
                QTY: 1,
                ProductUrl: product.ProductUrl,
                ValidateMessage: product.ValidateMessage
            } as CartItem;

            // console.log(' push cart@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2')
            // console.log("GGG" + JSON.stringify(item))
            cart.push(item);
        }
        else {

            console.log('inside remove cart ')
            cart.find(x => x.ID == product.ID).IsValid = product.IsValid;
            cart.find(x => x.ID == product.ID).ValidateMessage = product.ValidateMessage;
            this.removeProduct(product.ID);
        }
        this.saveCart(cart);
    }


    // AddItemToWishList(product: ProductViewModel) {

    //     let wishList = this.getItems();
    //      console.log(wishList)
    //     if (wishList.filter(x => x.ID == product.ID).length <= 0) {
    //         console.log('added to wish list')
    //         wishList.push(product);
    //     }
    //     else {
    //         console.log('removed to wish list')
    //         this.removeProduct(product.ID);
    //     }
    //     this.saveWishList(wishList);
    //     console.log('after operation')
    //     let rewishList = this.getItems();
    //     console.log(rewishList)
    // }



    // updateProduct(product: ProductViewModel) {
    //     let cart = this.getItems();
    //     //console.log(product)
    //     if (cart.filter(x => x.ID == product.ID).length <= 0) {
    //         cart.push({ Image: product.Image, Weight: product.Weight, Price: product.NewPrice, MaxQTY: product.MaxQTY, Name: product.Name, ID: product.ID, QTY: product.QTY,ProductUrl:product.ProductUrl,IsValid:product.IsValid,ValidateMessage:product.ValidateMessage});
    //     }
    //     else {
    //         this.removeProduct(product.ID);
    //     }
    //     this.saveCart(cart);
    // }
    // clear(): void {
    //     this.saveCart([]);

    // }
    isProductExist(id: number) {
        //console.log("isProductExist : " + this.getItems().findIndex(x => x.ID == id));
        return this.getItems().findIndex(x => x.ID == id) != -1;
    }


    updateQTY(product: CartItem) {
        let cart: CartItem[] = this.getItems();
        cart.forEach(cartItem => {
            if (cartItem.ID == product.ID) {
                cartItem.QTY = product.QTY;
            }
        });


        this.saveCart(cart);
        console.log('////////////////////////updaaaaaaaaaaaaaaate//////////////////////////////////////////////////')
        let cart1 = this.getItems();
        console.log(cart1)

    }

    calcTotalPrice(): number {
        //get items from backend
        let cart = this.getItems();
        console.log('Calculates total Money oF Cart')
        console.log(cart);
        let totalPrice = 0;
        cart.forEach(product => {
            if (product.IsValid == true) {
                totalPrice += product.Price * product.QTY;
            }

        });


        return totalPrice
        //  return this.apiService.post('/order/GetValidatedProductsCart', cart).map(data => data).do(data => //console.log('result: ' + JSON.stringify(data)));


        // let totalPrice = 0;
        // let items = this.getItems();

        // for (let index = 0; index < items.length; index++) {
        //     totalPrice += items[index].QTY * items[index].NewPrice;
        // }
        // return totalPrice;
    }

    validate(): Observable<ResultViewModel> {
        let cart = this.getItems();
        return this.apiService.post('/cart/validate', cart).map(data => data).do(data => console.log('result: ' + JSON.stringify(data)));
    }
    validateCartProducts(): Observable<ResultViewModel> {
        let cart = this.getItems();
        return this.apiService.post('/order/ValidateCartList', cart).map(data => data).do(data => console.log('result: ' + JSON.stringify(data)));

    }

    getShippingRegionsWithCost() {
        let cart = this.getItems();
        return this.apiService.post('/cart/GetShippingRegionsWithCost', cart);
    }


    // new api for get static Shopping cost
    getShippingCost() {
        //let cart = this.getItems();
        return this.apiService.get('/cart/GetShippingCost');
    }
}
