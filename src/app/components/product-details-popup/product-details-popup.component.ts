import { Component, OnInit, Inject, EventEmitter, Output, Input } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { SpecificationValueViewModel } from '../product/product-grid/view-models/specification-value-view-model';
import { ProductService } from '../product/product-grid/product.service';
import { ActivatedRoute, Router } from "@angular/router";
import { ProductViewModel } from '../shared/product/product-view-model';
import { productReviewsViewModel } from '../product-details/product-reviews-view-model';
import { CustomerCartService } from '../../shared/services/cart.service';
import { WishListService } from '../customer/wish-list/wish-list.service';
import { Specification } from '../product/product-grid/view-models/specification-model';
import { ItemDetailsViewModel } from '../product-details/item-details-view-model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SnotifyService } from 'ng-snotify';
import { CustomerService } from '../../shared/services/account/customer.service';
import { IProduct } from 'src/app/shared/view-models/product-view-model';
@Component({
  selector: 'app-product-details-popup',
  templateUrl: './product-details-popup.component.html',
  styleUrls: ['./product-details-popup.component.css']
})
export class ProductDetailsPopupComponent implements OnInit {
  gallery2Options: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[] = [];
  selectedProductValues: SpecificationValueViewModel[] = [];
  selectedItemValues: SpecificationValueViewModel[] = [];
  @Output() sendNotification: EventEmitter<object> = new EventEmitter();
  // productID: number = 0;
  // product: ProductViewModel = new ProductViewModel();
  productReviews: productReviewsViewModel[] = [];
  productSpecifications: Specification[] = [];
  itemDetails: ItemDetailsViewModel = new ItemDetailsViewModel();
  isLoading: boolean = false;
  ShowSpecification: boolean = true;
  @Input() products: any;
  product: IProduct | undefined;
  errorMessage = '';
  constructor(
    private productService: ProductService,
    private route: Router,
    private cartService: CustomerCartService,
    private wishlistService: WishListService,
    @Inject(MAT_DIALOG_DATA) public productID: any,
    public dialogRef: MatDialogRef<ProductDetailsPopupComponent>,
    private activatedRoute: ActivatedRoute, private snotifyService: SnotifyService, private customerService: CustomerService,
  ) {

    this.gallery2Options = [
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

  ngOnInit() {
    
    // const param = this.activatedRoute.snapshot.paramMap.get('id');
    // if (param) {
    //   const id = +param;
    //   this.getProduct(id);
    // }

    this.activatedRoute.paramMap.subscribe(response => {
      this.productSpecifications = [];
      this.getProduct(this.productID);
      // this.productID = +response.get('id');

      //  this.fetchProduct = +response.get('fetchProduct');
      //   alert(this.fetchProduct);
      this.productService.getAllProducts(this.productID).subscribe(res => {
        this.itemDetails = res.Data;
        // alert("length"+this.itemDetails.Products.length);
        if (this.itemDetails.Products.length == 1) {
          this.ShowSpecification = false;
        }
      })

    });
  }
  getProduct(id: number): void {
    this.productService.getProduct(id).subscribe({
      next: product => this.product = product,
      error: err => this.errorMessage = err
    });
  }

  getProductReviews(id: number) {
    this.productService.getProductReviews(id).subscribe((response) => {

      
      this.productReviews = response.Data.Result;



    });
  }
  // getProduct(productID) {

  //   // alert("GetProduct");
  //   //clear gallery first to initalize the new images of that product
  //   this.galleryImages = [];
  //   this.selectedProductValues = [];
  //   this.selectedItemValues = [];
  //   //clear product specification
  //   // alert("Product                    Specific" + JSON.stringify(this.productSpecifications))

  //   this.productService.getProduct(productID).subscribe((response) => {
  //     if (!response.Success)
  //       this.route.navigateByUrl("/");
  //     else {

  //       console.log('this.product  respons ------------------------------------------------------------------------------------')
  //       console.log(response.Data)
  //       // i can not reach product from item , so i put data directly in product
  //       this.product = response.Data;
  //       console.log('this.product  value ------------------------------------------------------------------------------------')
  //       console.log(this.product)
  //       this.getProductReviews(this.product.ID);

  //       //  alert(JSON.stringify(this.product));
  //       //  this.item = response.Data;
  //       //  alert(JSON.stringify(this.product.ID));
  //       //  //console.log(this.item);
  //       this.isLoading = true;

  //       if (this.cartService.isProductExist(this.product.ID)) {

  //         this.product.AddedToCart = true;
  //       }

  //       if (this.wishlistService.isProductExist(this.product.ID)) {
  //         this.product.AddedToWishlist = true;

  //       }

  //       this.product.QTY = 1;
  //       this.calcMaxQTY(this.product);

  //       let image = { small: this.product.Image, medium: this.product.Image, big: this.product.Image };
  //       this.galleryImages.push(image);
  //       for (let i = 0; i < this.product.Images.length; i++) {
  //         var img = { small: this.product.Images[i], medium: this.product.Images[i], big: this.product.Images[i] };
  //         this.galleryImages.push(img);
  //       }
  //       this.product.Specifications.forEach(spec => {
  //         this.selectedProductValues.push(spec.Values[0])
  //       })



  //     }
  //   })

  //   // alert("Again product spec" + JSON.stringify(this.productSpecifications))
  //   console.log('this.product ------------------------------------------------------------------------------------')
  //   console.log(this.product)
  // }


  calcMaxQTY(product: ProductViewModel) {

    product.MaxQTY = product.Stock < product.OrderMaximumQuantity ? product.Stock : product.OrderMaximumQuantity;
   
  }
  productDetails(ProductUrl) {
    this.route.navigate([ProductUrl]);
    this.dialogRef.close();
  }
  addToCart(product: ProductViewModel) {

    this.product.AddedToCart = true;
    this.cartService.addToCart(product);
    let Content: string = "تم اضافة " + product.Name + " لعربة التسوق ";
   
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
    this.cartService.removeProduct(product.ID);
    let Content: string = "تم حذف " + product.Name + " من عربة التسوق ";
    this.snotifyService.error(Content, "", {
      timeout: 3000,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
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
  onNoClick(): void {
    this.dialogRef.close();
  }
}
