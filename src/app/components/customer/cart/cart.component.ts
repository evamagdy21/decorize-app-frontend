import { ResultViewModel } from './../../../shared/view-models/result-view-models';

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Title } from '@angular/platform-browser';
import { CartItem } from '../../../shared/view-models/cart-item-model';
import { CustomerCartService } from '../../../shared/services/cart.service';
import { ProductViewModel } from '../../shared/product/product-view-model';
import { Console } from 'console';


@Component({
  moduleId: module.id,
  selector: 'cart',
  templateUrl: 'cart.component.html',
  styleUrls: ['cart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CartComponent implements OnInit {
  cartProducts: CartItem[] = [];
  VaildcartProducts: ProductViewModel[] = [];
  NotcartProducts: ProductViewModel[] = [];
  count: number = 0;
  totalPrice: number = 0;
  maxQTY = 5;
  resultViewModel: ResultViewModel;
  InvalidCart = false;
  processing: boolean = false;
  shippingCost: number = 0;
  
  constructor(private activatedRoute: ActivatedRoute,
    private route: Router,
    private title: Title,
    private cartService: CustomerCartService
  ) {
    title.setTitle("عربة التسوق");
  }
  ngOnInit() {
   
    this.validate();
    this.cartService.getCartLength().subscribe(res => {
      this.count = res;
    });
    this.cartProducts = this.cartService.getItems();

  }

  addQTY(product: CartItem) {

    let index = this.cartProducts.indexOf(product);
    if (this.cartProducts[index].QTY < this.cartProducts[index].MaxQTY) {
      this.cartProducts[index].QTY += 1;
      this.cartService.updateQTY(this.cartProducts[index]);
      this.getCartAmount();
    }
  }

  removeQTY(product: CartItem) {
    let index = this.cartProducts.indexOf(product);
    if (this.cartProducts[index].QTY > 1) {
      this.cartProducts[index].QTY -= 1;
      this.cartService.updateQTY(this.cartProducts[index]);
      this.getCartAmount();
    }


  }
  getCartAmount() {
    this.totalPrice = this.cartService.calcTotalPrice();

  }
  removeFromCart(product: CartItem) {
    let index = this.cartProducts.indexOf(product);
    this.cartProducts.splice(index, 1);
    this.cartService.removeProduct(product.ID);
    this.getCartAmount();
    if( this.cartProducts.length<=0)
     {

        // alert('less 1')
        // this.cartService.clearCart();

      this.route.navigate(['/home'])
     }
  }
  validate() {

    this.cartService.validate().subscribe(res => {



      if (res.Success) {

        if (res.Data.ValidProducts.length > 0 && res.Data.NotValidProducts.length <= 0) {


          this.VaildcartProducts = res.Data.ValidProducts;

          this.VaildcartProducts.forEach(element => {
          
            
            element.IsValid = true;

        
            
            this.cartService.addToCart(element)
          });
        }
        else if (res.Data.NotValidProducts.length > 0 && res.Data.ValidProducts.length > 0) {

          this.VaildcartProducts = res.Data.ValidProducts;
          this.NotcartProducts = res.Data.NotValidProducts;

          this.VaildcartProducts.forEach(element => {

            element.IsValid = true;
            this.cartService.addToCart(element)
          });

          this.NotcartProducts.forEach(element => {

            element.IsValid = false;
            this.cartService.addToCart(element)
          });
          this.cartProducts = this.cartService.getItems();
       

        }
        else {
          this.cartProducts = [];
        }



      }
      else {
        this.cartProducts = [];
        this.cartService.clearCart();
        this.route.navigateByUrl("/");
      }


      this.shippingCost = res.Data.ShippingCost;
      this.getCartAmount();
      this.cartProducts = this.cartService.getItems();

    });



  }
  // getProduct() {
  //   this.cartProducts = this.cartService.getItems();

  //   if (this.cartProducts.length == 0)
  //     this.route.navigateByUrl("/");
  //     this.cartService.validateCartProducts().subscribe(res => {
  //     if (res.Data == null) {
  //       this.resultViewModel = res;
  //       this.InvalidCart = true;

  //       this.cartService.clearCart();
  //     } else {
  //       this.cartService.clearCart();
  //       res.Data.forEach(element => {
  //         this.cartService.updateProduct(element)
  //       });


  //     }    

  //   })

  // }


}

