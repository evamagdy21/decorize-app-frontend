import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import { SpecificationViewModel } from './view-models/specification-view-model';
import { ProductService } from './product.service';
import { ProductViewModel } from '../../shared/product/product-view-model';
import { Paging } from '../../../shared/view-models/paging-model';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchCriteria } from '../../../shared/view-models/search-criteria-model';
import { NotificationsService } from 'angular2-notifications';
import { Title } from '@angular/platform-browser';
import { OrderItem } from '../../../shared/view-models/order-view-model';
import { SearchViewModel } from '../../../shared/view-models/search-view-model';
import { HttpParams } from '@angular/common/http';
import { CustomerCartService } from '../../../shared/services/cart.service';
import { CustomerService } from 'src/app/shared/services/account/customer.service';
import { ItemSearchViewModel } from '../../shared/product/item-search-view-model';
import { SnotifyService } from 'ng-snotify';
import { CartItem } from 'src/app/shared/view-models/cart-item-model';
import { SearchService } from '../../shared/search/search.service';
import { departmentCategoriesViewModel } from 'src/app/shared/view-models/department-categories-view-model';
import { WishListService } from '../../customer/wish-list/wish-list.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ProductDetailsPopupComponent } from '../../product-details-popup/product-details-popup.component';
// import {URLSearchParams} from '@angular/http';
@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.css']
})
export class ProductGridComponent implements OnInit {

  paging: Paging = new Paging();
  PriceRange = [100, 500];
  min: number=0;
  max: number=-0;

  lang: string;
  queryString: HttpParams = new HttpParams();
  orderingList: OrderItem[];
  searchKeyword:string;
  typeID:number=-1;
  OrderId: number = 0;
  isLoading: boolean = false;
  // departmentsList: departmentCategoriesViewModel[] = [];
  departmentsList =this.productService.getDepartments();
  brandsList =this.productService.getAllBrands();
  products=this.productService.getFeaturedProducts();
  isSearchNewPage: boolean = false;
  cartQTY: number;
  @Output() sendNotification: EventEmitter<object> = new EventEmitter();
  // products: ProductViewModel[];
  // products: ItemSearchViewModel[];
  searchQuery: SearchViewModel = new SearchViewModel();
  searchCriteria: SearchCriteria = new SearchCriteria();
  constructor(private activatedRoute: ActivatedRoute, private route: Router, title: Title, private productService: ProductService
    , private _notificationsService: NotificationsService, private snotifyService: SnotifyService,
    private cartService: CustomerCartService,
    private searchService: SearchService,
    private wishlistService:WishListService,private customerService: CustomerService,public dialog: MatDialog
  ) {
    title.setTitle("Decorize");
    this.orderingList = [
      { ID: 1, Name: "shared.order-by-lowest-price", Selected: true },
      { ID: 2, Name: "shared.order-by-highest-price", Selected: false },
      { ID: 3, Name: "shared.order-by-newest", Selected: false }];


    this.searchCriteria.Brands=[];
    this.searchCriteria.Categories=[];
    this.searchCriteria.Conditions=[];
    this.searchCriteria.Specifications=[];
  }

  ngOnInit() {
 



      
    // this.activatedRoute.queryParams.subscribe((params) => {
    //   if(params.term != "" && params.term != undefined)
    //       this.searchKeyword = params.term;
 
    //   this.initializePage();
    //   if (params['specificationId'] == undefined && params['conditionId'] == undefined && params['categoryId'] == undefined && params['brandId'] == undefined && params['departmentId'] == undefined && params['term'] == undefined && params['pageIndex'] == undefined) {

    //     this.route.navigate(['/']);

    //   }
    
    //   if (params['pageIndex'] != undefined) {
    //     this.queryString = this.queryString.append('pageIIndex', '1');
    //     this.searchQuery.pageIndex = params['pageIIndex'];
    //   }
    //   var text = document.getElementById('keyword');
    //   if (params['term'] != undefined) {
    //     this.queryString = this.queryString.append('term', params['term']);
       
    //     this.searchQuery.text = params['term'];
      
    //   }
      
    //   if (params['departmentId'] != undefined) {
    //     this.queryString = this.queryString.append('departmentId', params['departmentId']);
    //     this.searchQuery.departmentId = params['departmentId'];
    //   }
    //   if (params['categoryId'] != undefined) {
    //     this.queryString = this.queryString.append('categoryId', params['categoryId']);
    //     this.searchQuery.categoryId = params['categoryId'];
    //   }
    //   if (params['brandId'] != undefined) {
    //     this.queryString = this.queryString.append('brandId', params['brandId']);
    //     this.searchQuery.brandId = params['brandId'];
    //   }

    //   if (params['conditionId'] != undefined) {
    //     this.queryString = this.queryString.append('conditionId', params['conditionId']);
    //     this.searchQuery.conditionId = params['conditionId'];
    //   }
    //   if (params['fromPrice'] != undefined) {
    //     this.queryString = this.queryString.append('fromPrice', params['fromPrice']);
    //     this.searchQuery.fromPrice = params['fromPrice'];
    //   }
    //   if (params['toPrice'] != undefined) {
    //     this.queryString = this.queryString.append('toPrice', params['toPrice']);
    //     this.searchQuery.toPrice = params['toPrice'];
    //   }
    //   if (params['specificationId'] != undefined) {
    
    //     this.queryString = this.queryString.append('specificationId', params['specificationId']);
    //     this.searchQuery.specificationId = params['specificationId'];
    //   }
    //   if (params['orderBy'] != undefined) {
       
    //     this.queryString = this.queryString.append('orderBy', params['orderBy']);
    //     this.searchQuery.orderBy = params['orderBy'];
    //   }
    //   this.loadResult();
    //   this.searchService.get().subscribe(response => {
    //     if (response.Success) {
    //       console.log(response.Data)
       
    //       // this.departmentsList = response.Data as departmentCategoriesViewModel[];
    //     }
    //   });
   
    // });





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
  loadResult() {
  
    // this.getProductsCount();
    this.filterByCategories();
    this.filterByConditions();
    this.filterByBrands();
    this.filterBySpecifications();
  }


  filterByCategories() {

    this.productService.filterByCategories(this.queryString).subscribe((response) => {
      this.searchCriteria.Categories = response.Data;
      
    });
  }

  filterByBrands() {
    this.productService.filterByBrands(this.queryString).subscribe((response) => {
      this.searchCriteria.Brands = response.Data;
 
    });
  }
  
  filterByConditions() {
    this.productService.filterByConditions(this.queryString).subscribe((response) => {
      this.searchCriteria.Conditions = response.Data;
 
      
    });
  }
  filterBySpecifications() {
    this.productService.filterBySpecifications(this.queryString).subscribe((response) => {
      this.searchCriteria.Specifications = response.Data;
     
    

    });
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
     if (!this.customerService.hasAccessToken()) {
 
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
  // getProductsCount() {
  
  //   this.productService.getProductsCount(this.queryString).subscribe((response) => {
  
  //     this.paging.Records = response.Data;
  //     if (this.paging.Records > 0) {

  //       this.getProducts();
  //       this.paging.Pages = Math.ceil(this.paging.Records / this.paging.PageSize);
   

  //     }
  //     else {
  //       this.isLoading = false;
  //     }
  //   });
  // }

  showMoreButton(): boolean {

    return (this.paging.Pages > 0 && this.paging.CurrentPage < this.paging.Pages);
  }
  // getProducts() {
   
  //   this.productService.getProducts(this.queryString).subscribe((response) => {
  //     let result: ItemSearchViewModel[] = response.Data.Result;
  //     result.forEach(item => {
  //       if(item.SelectedProduct.IsMaxPrice){
  //         this.max = item.SelectedProduct.NewPrice;
       
  //       }
        
  //       if(item.SelectedProduct.IsMinPrice){
  //         this.min = item.SelectedProduct.NewPrice;
       
  //       }
  //       item.SelectedProduct.AddedToCart = this.cartService.isProductExist(item.SelectedProduct.ID);
        
  //       if (item.SelectedProduct.Code == undefined || item.SelectedProduct.Code == "" || item.SelectedProduct.Code.length == 0) {
  //         item.SelectedProduct.Code = "No-Code";
  //       }
  //     }
  //     );
  //     // this.products = this.products.concat(result);
  //     this.isLoading = false;
  //     this.isSearchNewPage = false;
  //     console.log("all this.products :-----------------------------------------------");
  //     console.log(this.products);


  //   });
  // }
  showNextPage() {
    this.isSearchNewPage = true;
    this.paging.CurrentPage = this.paging.CurrentPage + 1;
    if (this.queryString.has("page")) {
      this.queryString = this.queryString.set("page", this.paging.CurrentPage.toString());
    }
    else
      this.queryString = this.queryString.append("page", this.paging.CurrentPage.toString());

    // this.getProducts();

  }
  initializePage() {
    // this.products = [];
    this.queryString = new HttpParams();
    this.paging = new Paging();
    this.isLoading = true;
  }

 
  search() {

  

    let params: any = {};
    let categories: string[] = [];
    let brands: string[] = [];
    let conditions: string[] = [];
    let specifications: string[] = [];

    if(this.searchQuery.departmentId == -1 || this.searchQuery.departmentId >0)
    {
   
      params.departmentId = this.typeID;
    }


    this.searchCriteria.Categories.filter(type => type.Selected).forEach((type) => { categories.push(type.ID.toString()); });
    this.searchCriteria.Brands.filter(brand => brand.Selected).forEach((brand) => { brands.push(brand.ID.toString()); });
    this.searchCriteria.Conditions.filter(condition => condition.Selected).forEach((condition) => { conditions.push(condition.ID.toString()); });
    this.searchCriteria.Specifications.forEach((specification) => {
      specification.Values.filter(x => x.Selected).forEach(value => {
        specifications.push(value.ID.toString());
      });
    });
    if(this.min != -1 && this.min !=0)
      params.fromPrice = this.min;
    if(this.max != -1 && this.max!=0)  
      params.toPrice = this.max;
    if (categories.length > 0)
      params.categoryId = categories.join('_');
    if (brands.length > 0)
      params.brandId = brands.join('_');
    if (conditions.length > 0)
      params.conditionId = conditions.join('_');
    if (specifications.length > 0)
      params.specificationId = specifications.join('_');
    if (this.OrderId != 0)
    {

      params.orderBy = this.OrderId;
    }
    
    let text: string = (<HTMLInputElement>document.getElementById("keyword")).value;
    if (text != "") {
      params.term = text;
    }
    if (this.typeID > 0) {
    
     params.departmentId = this.typeID;      //ekram
   
    }
   
    this.route.navigate(['/search'], { queryParams: params });

  }

  searchbyCoin(){
    this.search()
  }
  searchWithoutCoin(){
    this.max=0;
    this.min=0;
    (<HTMLInputElement>document.getElementById("keyword")).value = "";
    this.search()
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
