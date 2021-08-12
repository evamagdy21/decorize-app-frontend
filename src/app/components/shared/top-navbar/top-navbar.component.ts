import { TokenService } from './../../../shared/services/token.service';
import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Injectable, ViewContainerRef, ComponentRef, ComponentFactoryResolver, NgZone } from "@angular/core";
import { TopNavbarService } from './top-navbar.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { departmentCategoriesViewModel } from '../../../shared/view-models/department-categories-view-model';
import { CustomerCartService } from '../../../shared/services/cart.service';
import { MessageService } from '../../../shared/services/message.service';
import { WishListService } from '../../customer/wish-list/wish-list.service';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { LocalStorageService } from 'angular-2-local-storage';
import { NotificationShowService } from '../notification/notification-show.service';
import { SignalRService } from 'src/app/shared/services/signalr.service';
import { NotificationShowComponent } from '../notification/notification-show.component';
import { RealtimeNotificationViewModel } from 'src/app/shared/view-models/realtime-notification-view-model';
import { CustomerService } from 'src/app/shared/services/account/customer.service';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css']
})
export class TopNavbarComponent implements OnInit {
  cartQTY: number;
  wishlistQTY: number;

  departmentsList: departmentCategoriesViewModel[] = [];
  @ViewChild('stickyMenu') menuElement: ElementRef;
  notificationcomponentLoaded = false;
  notificationCount: number = 0;
  components = [];
  ref: ComponentRef<any>;
  @ViewChild('notificationitemscontainer', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;
  isAuthorized: boolean = false;
  sticky: boolean = false;
  fixed: boolean = true;
  elementPosition: any;
  imgSrc: string;
  lang: string;
  className: string;
  wishlistItemCount: number = 0;
  constructor(private _messageService: MessageService,
    private wishListService: WishListService,
    private snotifyService: SnotifyService,
    private localStorageService: LocalStorageService,
    private ngZone: NgZone,
    private customerService: CustomerService,
    private notificationService: NotificationShowService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private signalRService: SignalRService,
    private tokenService: TokenService,
    private cartService: CustomerCartService, private route: Router,
    private topNavbarService: TopNavbarService, private spinner: NgxSpinnerService) {
    this.lang = this.localStorageService.get("lang");
    this.subscribeToEvents();

    this.isAuthorized = this.tokenService.getToken() == "" ? false : true;
  }

  ChangeMeesage() {
    this.cartService.changeCartLength(30);

  }

  ngOnInit() {
    this.spinner.show();

    if (this.customerService.hasAccessToken()) {
      this.getUnseenCount();
      this.wishListService.get().subscribe(res => {

        if (res.Success) {

          this.wishlistItemCount = res.Data.length;
          this.wishlistQTY = this.wishlistItemCount;

        }
      });
    }

    this.cartService.getCartLength().subscribe(res => {
      this.cartQTY = res;

      console.log("this.cartQTY : "+res);
    });
    this.wishListService.getWishListLength().subscribe(res => {

      // alert("here i'm in top nav bar" + this.wishlistQTY)
      this.wishlistQTY = res;

    });

    // this.cartService.getCartQTY().subscribe(qty =>{
    //   this.cartQTY = qty
    //   //console.log("cart QTY : "+qty);
    // });
    this.topNavbarService.get().subscribe(response => {
      if (response.Success) {
        this.spinner.hide();
        this.departmentsList = response.Data as departmentCategoriesViewModel[];
      }
    });
    // this.cartService.clear();  

    // this.numberOfItems=this.cartService.getItems().length;
    if (this.className = "fixed-top") {
      this.imgSrc = "../../../../assets/images/logo.png"
    }
  }

  ngAfterViewInit() {
    this.elementPosition = this.menuElement.nativeElement.offsetTop;
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (window.pageYOffset > this.elementPosition) {
      let element = document.getElementById('navbar');
      element.classList.add('sticky-top');
      element.classList.remove('fixed-top');
      this.imgSrc = "../../../../assets/images/logo_small.png"
    } else {
      let element = document.getElementById('navbar');
      element.classList.remove('sticky-top');
      element.classList.add('fixed-top');
      this.imgSrc = "../../../../assets/images/logo.png"
    }
  }




  GoToCart() {

    if (this.cartQTY < 1) {
      let Content = (this.lang == "ar") ? "ليس لديك اي منتجات داخل عربة التسوق" : "You do not have any products inside your shopping cart"

      this.snotifyService.success(Content, "", {
        timeout: 3000,
        showProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,

      });
    }
    else {
      this.route.navigate(['/cart'])
    }
  }

  GoToWishList() {

    this.wishListService.get().subscribe(res => {

      if (res.Success) {
        this.wishlistItemCount = res.Data.length;
        if (this.wishlistItemCount < 1) {
          let Content = (this.lang == "ar") ? "ليس لديك أي منتجات داخل قائمتك المفضلة" : "You do not have any products inside your Favorite List "
          this.snotifyService.success(Content, "", {
            timeout: 3000,
            showProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,

          });

        }
        else {
          this.route.navigate(['/wishlist'])
        }

        this.wishlistItemCount = res.Data.length;
        this.wishlistQTY = this.wishlistItemCount;

      }
    });

  }

  @ViewChild('myTarget') myTarget;

  @HostListener('document:click', ['$event.target'])
  onClick(targetElement) {
    const clickedInside = this.myTarget.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.notificationcomponentLoaded = false;
    }
  }

  loadNotifications() {
    try {
      this.ref.destroy();
    }
    catch (e) {

    }
    if (!this.notificationcomponentLoaded) {
      const factory = this.componentFactoryResolver.resolveComponentFactory(NotificationShowComponent);
      this.ref = this.viewContainerRef.createComponent(factory);
      this.ref.changeDetectorRef.detectChanges();
      this.notificationcomponentLoaded = true;
    } else {
      this.notificationcomponentLoaded = false;
    }
  }

  getUnseenCount() {
    this.notificationService.getUnseenCount().subscribe(response => {
      this.notificationCount = response.Data;
      console.log("Count: " + this.notificationCount);
    })
  }


  private subscribeToEvents(): void {
    this.signalRService.messageReceivedNotify.subscribe((notifiy: RealtimeNotificationViewModel) => {
      console.log(notifiy);
      this.ngZone.run(() => {
        this.getUnseenCount();
      });
    });
    this.signalRService.changeOrderStatusNotify.subscribe((notifiy: RealtimeNotificationViewModel) => {
      this.ngZone.run(() => {
        this.getUnseenCount();
        console.log(notifiy);
      });
    });
    this.signalRService.discountNotifiy.subscribe((notifiy: RealtimeNotificationViewModel) => {
      this.ngZone.run(() => {
        var msg1 = (this.lang == "ar") ? "الذهاب الي تفاصيل المنتج" : "Go to product details";
        let productName = (this.lang == "ar") ? notifiy.Data.ProductDetails.NameArabic : notifiy.Data.ProductDetails.NameEnglish
        let path = "/product/" + notifiy.Data.ProductDetails.ID + "/" + this.getProductName(productName);
        this.showNotify(productName, this.lang == "ar" ? notifiy.MessageAr : notifiy.MessageEn, msg1, path);
        console.log(notifiy);
      });
    });
    this.signalRService.newProductNotify.subscribe((notifiy: RealtimeNotificationViewModel) => {
      this.ngZone.run(() => {
        var msg1 = (this.lang == "ar") ? "الذهاب الي تفاصيل المنتج" : "Go to product details";
        let productName = (this.lang == "ar") ? notifiy.Data.NameArabic : notifiy.Data.NameEnglish
        let path = "/product/" + notifiy.Data.ID + "/" + this.getProductName(productName);
        this.showNotify(productName, this.lang == "ar" ? "منتج جديد" : "New Product", msg1, path);

        console.log(notifiy);
      });
    });

    this.notificationService.unseenCount.subscribe((notifiy: Number) => {
      this.ngZone.run(() => {
        this.getUnseenCount();
      });
    });
  }


  getProductName(name: string) {
    return name.trim().replace(/ /g, "-").substring(0, 20).toLowerCase();
  }

  showNotify(productName, title, msg1, path) {
    this.snotifyService.confirm(productName, title, {
      timeout: 8000,
      showProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      buttons: [
        { text: msg1, action: (toast) => { this.route.navigateByUrl(path); this.snotifyService.remove(toast.id); }, bold: false },
      ]

    });
  }
}


