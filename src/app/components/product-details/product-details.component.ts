
import { Component, OnInit, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Title } from '@angular/platform-browser';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { ProductViewModel } from '../shared/product/product-view-model';
import { Specification } from '../product/product-grid/view-models/specification-model';
import { CustomerCartService } from '../../shared/services/cart.service';
import { ProductService } from '../product/product-grid/product.service';
import { CustomerService } from '../../shared/services/account/customer.service';
import { WishListService } from '../customer/wish-list/wish-list.service';
import { productReviewsViewModel } from './product-reviews-view-model';
import { ResultViewModel } from '../../shared/view-models/result-view-models';
import { ItemViewModel } from './item-view-model';
import { SpecificationValueViewModel } from '../product/product-grid/view-models/specification-value-view-model';
import { ItemDetailsViewModel } from './item-details-view-model';
import { SnotifyService } from 'ng-snotify';

@Component({
  moduleId: module.id,
  selector: 'product-details',
  templateUrl: 'product-details.component.html',
  styleUrls: ['product-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductDetailsComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[] = [];
  @Output() sendNotification: EventEmitter<object> = new EventEmitter();
  // itemId: number = 0;
  productId: number =0;
  fetchProduct: number = -1;
  isLoading: boolean = false;
  result: ResultViewModel;
  valuesId: SpecificationValueViewModel[] = [];
  NonSelectedSpec: SpecificationValueViewModel[] = [];
  product: ProductViewModel = new ProductViewModel();
  item: ItemViewModel = new ItemViewModel();
  ShowSpecification: boolean = true
  itemDetails: ItemDetailsViewModel = new ItemDetailsViewModel();
  relatedProducts: ProductViewModel[] = [];
  productSpecifications: Specification[] = [];
  productReviews: productReviewsViewModel[] = [];
  selectedProductValues: SpecificationValueViewModel[] = [];
  selectedItemValues: SpecificationValueViewModel[] = [];

  constructor(private activatedRoute: ActivatedRoute,
    private route: Router,
    private title: Title,
    private customerService: CustomerService,
    private cartService: CustomerCartService,
    private wishlistService: WishListService,
    private snotifyService: SnotifyService,
    private productService: ProductService) {
    title.setTitle("Decorize");

    this.galleryOptions = [
      {
        width: '400px',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: true
      }
    ];
  }
  ngAfterInit() {

  }
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(response => {
      this.productSpecifications = [];

      this.productId = +response.get('id');
      this.getProduct();
      //  this.fetchProduct = +response.get('fetchProduct');
      //   alert(this.fetchProduct);
      this.productService.getAllProducts(this.productId).subscribe(res => {
        this.itemDetails = res.Data;
        // alert("length"+this.itemDetails.Products.length);
        if (this.itemDetails.Products.length == 1) {
          this.ShowSpecification = false;
        }
      })

    });

    //  this.getProductReviews(this.product.ID);

  }

  ngOnDestroy() {
    // alert("destory")
  }
  getProductReviews(id: number) {
    this.productService.getProductReviews(id).subscribe((response) => {

      console.log("reviews")
      this.productReviews = response.Data.Result;

      console.log(  this.productReviews )
      //console.log("reviews : " + JSON.stringify(this.productReviews));

    });
  }

  addToCart(product: ProductViewModel) {
    //console.log("Add to cart" + JSON.stringify(product))
    this.product.AddedToCart = true;
    // this.cartService.addProduct(this.product);
    let Content: string = "تم اضافة " + product.Name + " لعربة التسوق ";
    // alert(Content);
    this.snotifyService.success(Content, "", {
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
  removeFromCart(product: ProductViewModel) {
    product.AddedToCart = false;
    // this.cartService.removeProduct(product.ID);
    let Content: string = "تم حذف " + product.Name + " من عربة التسوق ";
    this.snotifyService.error(Content, "", {
      timeout: 3000,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
    });

  }
  getProduct() {
 
    // alert("GetProduct");
    //clear gallery first to initalize the new images of that product
    this.galleryImages = [];
    this.selectedProductValues = [];
    this.selectedItemValues = [];
    //clear product specification
    // alert("Product                    Specific" + JSON.stringify(this.productSpecifications))

    // this.productService.getProduct(this.productId).subscribe((response) => {
    //   if (!response.Success)
    //     this.route.navigateByUrl("/");
    //   else {

    //     console.log('this.product  respons ------------------------------------------------------------------------------------')
    //     console.log(response.Data)
    //     // i can not reach product from item , so i put data directly in product
    //     this.product = response.Data;
    //     console.log('this.product  value ------------------------------------------------------------------------------------')
    //     console.log(  this.product)
    //     this.getProductReviews(this.product.ID);

    //     //  alert(JSON.stringify(this.product));
    //     //  this.item = response.Data;
    //     //  alert(JSON.stringify(this.product.ID));
    //     //  //console.log(this.item);
    //     this.isLoading = true;
       
    //     // if (this.cartService.isProductExist(this.product.ID))
    //     {
    
    //       this.product.AddedToCart = true;
    //     }
      
    //     if (this.wishlistService.isProductExist(this.product.ID))
    //     {
    //       this.product.AddedToWishlist = true;

    //     }
          
    //     this.product.QTY = 1;
    //     this.calcMaxQTY(this.product);

    //     let image = { small: this.product.Image, medium: this.product.Image, big: this.product.Image };
    //     this.galleryImages.push(image);
    //     for(let i=0;i< this.product.Images.length;i++)
    //       {
    //         var img={small:this.product.Images[i],medium:this.product.Images[i],big:this.product.Images[i]};
    //         this.galleryImages.push(img);
    //       }
    //     this.product.Specifications.forEach(spec => {
    //       this.selectedProductValues.push(spec.Values[0])
    //     })
 


    //     //get specifications for selected item
    //     this.productService.getSpecificationsForItem(this.productId).subscribe(res => {
    //       this.productSpecifications = res.Data;
        

    //       //step 2
    //       this.productSpecifications.forEach(ps => {
    //         ps.Values.forEach(value => {
    //           if (this.selectedProductValues.find(v => v.ID == value.ID)) {
    //             value.Selected = true;
    //             value.Show = true;
    //           }
    //           this.selectedItemValues.push(value);
    //         })


           


    //         //step3
    //         this.selectedItemValues.forEach(specValue => {
    //           let newCreatedProductList = this.createNewSelectedProductValues(specValue);
    //           //step4
    //           let res = this.checkExistenceProduct(newCreatedProductList);
    //           //   alert(res);
    //           if (res == true) {
    //             //update show property if result = true in the displayed list productspecification
    //             this.productSpecifications.forEach(element => {
    //               element.Values.forEach(x => {
    //                 if (x.ID == specValue.ID)
    //                   x.Show = true;
    //                 // x.Selected=false;
    //               })
    //             });




    //           }


    //         });




    //       })


    //     })
    //   }
    // })

    // alert("Again product spec" + JSON.stringify(this.productSpecifications))
    console.log('this.product ------------------------------------------------------------------------------------')
    console.log(this.product)
  }

  //check product existence
  checkExistenceProduct(list: SpecificationValueViewModel[]) {
    //iterate through the received list
    //debugger;
    let x: boolean;
    let y: boolean;
    let numberOfItems = list.length;
    this.itemDetails.Products.forEach(p => {
      let count = 0;
      if (x == true) {
        y = true;
        return true;
      }
      p.Specifications.forEach(sp => {
        sp.Values.forEach(val => {
          list.forEach(v => {
            if (v.ID == val.ID) {
              count++;
            }
          })
        })
      })
      if (count == numberOfItems) {
        x = true;
        y = true;
        return true;
      }
    })

    if (y == true) {
      return true;
    }
    return false;
  }
  //create new SelectedProductValues
  createNewSelectedProductValues(specValue: SpecificationValueViewModel) {
    //get rid of the specValue that match my specValue
    let newCreatedList = this.selectedProductValues.filter(specV => specV.SpecificationID != specValue.SpecificationID);
    //add my specValue to the new created list
    newCreatedList.push(specValue);
    return newCreatedList;
  }
  checkData() {
    //debugger;
    this.product.Specifications.forEach(element => {
      element.Values.forEach(value => {
        this.valuesId.push(value);
      });
    });
    //specification for the whole item
    this.productSpecifications.forEach(specItem => {
      //  alert(specItem.ID);
      specItem.Values.forEach(val => {
        //   alert(val.ID);
        if (this.valuesId.find(value => value.ID == val.ID)) {

          val.Selected = true;
          val.Show = true;
          //   alert("put selected items")
          //   alert(JSON.stringify(val));
        }
      })
      //get the non selected specs values
      specItem.Values.forEach(val => {
        if (val.Selected == false)
          this.NonSelectedSpec.push(val);
        //    alert(JSON.stringify(this.NonSelectedSpec));
      })
    });


  }



  filterBySpec(value: SpecificationValueViewModel) {

    let valuesList = this.createNewSelectedProductValues(value)

    this.getProductbySpecvalue(valuesList);
    //   let newCreatedProductList = this.createNewSelectedProductValues(value);


    //           alert("New List");
    //           alert(JSON.stringify(newCreatedProductList));

    //           //step4
    //           let res= this.checkExistenceProduct(newCreatedProductList);
    //           alert(res);
    //           if(res==true){
    //             //update show property if result = true in the displayed list productspecification
    //             this.productSpecifications.forEach(element => {
    //               element.Values.forEach(x=>{
    //                 if(x.ID == value.ID)
    //                   x.Show = true;
    //               })
    //             });

    // }
  }
  getProductbySpecvalue(valuesList: SpecificationValueViewModel[]) {
    let length = valuesList.length;
    this.itemDetails.Products.forEach(prod => {
      let count = 0
      prod.Specifications.forEach(sp => {
        if (valuesList.find(v => v.ID == sp.Values[0].ID) != undefined) {
          count++;
        }
      });
      if (count == length) {
        this.route.navigate(['/product', prod.ID])

      }


    });
  }
  addToWishList(product: ProductViewModel) {
    if (!this.customerService.hasAccessToken()) {

      this.route.navigateByUrl("/login");
      this.sendNotification.emit({ Type: 2, Title: 'قم بتسجيل الدخول أولاً.', Content: '' });
      return;
    }
    if (!product.AddedToWishlist) {
      //product.AddedToWishlist=true;
      this.wishlistService.create(product.ID).subscribe(response => {
        this.wishlistService.AddItemToWishList(product);
        let title: string = "تم اضافة " + product.Name + "  للمفضلة ";
        this.sendNotification.emit({ Type: 1, Title: title, Content: '' });
        product.AddedToWishlist = true//!product.AddedToWishlist;
      });

    }
  }

  removeFromWishList(product: ProductViewModel) {
    if (!this.customerService.hasAccessToken()) {
      this.sendNotification.emit({ Type: 2, Title: 'قم بتسجيل الدخول أولاً.', Content: '' });
      return;
    }
    if (product.AddedToWishlist) {
      this.wishlistService.removeProduct(product.ID).subscribe(response => {
        this.wishlistService.RemoveItemFromWishList(product.ID);
        let title: string = "تم حذف " + product.Name + " من المفضلة ";
        this.sendNotification.emit({ Type: 2, Title: title, Content: '' });
        product.AddedToWishlist = false//!product.AddedToWishlist;
      });
    }
  }

  calcMaxQTY(product: ProductViewModel) {
    //console.log(product)
    product.MaxQTY = product.Stock < product.OrderMaximumQuantity ? product.Stock : product.OrderMaximumQuantity;
    //console.log(product.MaxQTY)
  }

  addQTY() {
    if (this.product.QTY < this.product.MaxQTY) {
      this.product.QTY += 1;
    }
  }

  removeQTY() {
    if (this.product.QTY > this.product.OrderMinimumQuantity) {
      this.product.QTY -= 1;
    }
  }
  getItemProducts() {
    return this.itemDetails.Products.filter(prod => prod.ID != this.product.ID);
  }
  showNotification(event) {
    //get any value to can call filterbySpec to update specifications
    //  var firstValue;
    // alert("Product is"+JSON.stringify(event.Product))
    //  this.product = event.Product;
    //  this.product.Specifications.forEach(element => {
    //    element.Values.forEach(value => {
    //     firstValue = value;
    //    });
    //  });
    //  this.filterBySpec(firstValue);
    //  this.route.navigate(['/product', event.Product.ID,1])
  }
}

