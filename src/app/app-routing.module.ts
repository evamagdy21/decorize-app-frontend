import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './components/shared/layout/layout.component';
import { AuthGuard } from './shared/services/account/auth-guard.service';
import { ProductResolver } from './components/product-details/product-resolver.service';

const routes: Routes = [

  {
    path: 'home',
    component: LayoutComponent,
    loadChildren: './components/home/home.module#HomeModule'
  }
  ,
  {
    path: 'search',
    component: LayoutComponent,
    loadChildren: './components/product/product.module#ProductModule'
  },

  
  {
    path: 'confirm-email/:code',
    component: LayoutComponent,
    loadChildren: './components/customer/confirm-email/confirm-email.module#ConfirmEmailModule'
  }
  ,
  {
    path: 'activate-email',
    component: LayoutComponent,
    loadChildren: './components/customer/activate-email/activate-email.module#ActivateEmailModule'
  }
  ,
  {
    path: 'product/:id/:name',
    component: LayoutComponent,
    // resolve:{result:ProductResolver},
    loadChildren: './components/product-details/product-details.module#ProductDetailsModule'
  },
  {
    path: 'product/:id/:name',
    component: LayoutComponent,
    // resolve:{result:ProductResolver},
    loadChildren: './components/product-details-popup/product-details-popup.module#ProductDetailsPopupModule'
  },
  {
    path: '',
    component: LayoutComponent,
    loadChildren: './components/home/home.module#HomeModule'

    // redirectTo: 'home',
    // pathMatch: 'full'
  },
  {
    path: 'page/contact-us',
    component: LayoutComponent,
    loadChildren: './components/shared/contact-us/contact-us.module#ContactUsModule'
  }
  ,{
    path: 'page/:name',
    component: LayoutComponent,
    loadChildren: './components/shared/static-page/static-page.module#StaticPageModule'
  }
  ,
  {
    path: 'register',
    component: LayoutComponent,
    loadChildren: './components/customer/register/register.module#RegisterModule'
  }
  ,
  {
    path: 'forget-password',
    component: LayoutComponent,
    loadChildren: './components/customer/forget-password/forget-password.module#ForgetPasswordModule'
  }
  ,
  {
    path: 'cart',
    component: LayoutComponent,
    loadChildren: './components/customer/cart/cart.module#CartModule'
  }
  ,
  {
    path: 'reset-password/:code',
    // component: LayoutComponent,
    loadChildren: './components/customer/reset-password/reset-password.module#ResetPasswordModule'
  }
  ,
  {
    path: 'login',
    component: LayoutComponent,
    loadChildren: './components/customer/login/login.module#LoginModule'
  },
  {
    path: 'shipping-address',
    component: LayoutComponent,
    loadChildren: './components/customer/shipping-address/shipping-address.module#ShippingAddressModule',
    canActivate:[AuthGuard]
  }
  ,
  {
    path: 'create/:id',
    component: LayoutComponent,
    loadChildren: './components/customer/shipping-address/create/create.module#CreateModule',
    canActivate:[AuthGuard]
  },
  {
    path: 'checkout',
    component: LayoutComponent,
    loadChildren: './components/customer/checkout/checkout.module#CheckoutModule',
    canActivate:[AuthGuard]
  }
  
  ,
  {
    path: 'change-lang/:code',
    loadChildren: './components/shared/change-language/change-language.module#ChangeLanguageModule'

  }
  ,
  {
    path: 'order-confirmation/:id',
    component: LayoutComponent,
    loadChildren: './components/customer/order-confirmation/order-confirmation.module#OrderConfirmationModule',
    canActivate:[AuthGuard]
  }
  ,
  {
    path: 'payment-online-error',
    component: LayoutComponent,
    loadChildren: './components/customer/payment-online-error/payment-online-error.module#PaymentOnlineErrorModule',
    canActivate:[AuthGuard]
  }
  ,
  {
    
    path: 'order-info/:id',
    component: LayoutComponent,
    loadChildren: './components/customer/order-details/order-info/order-info.module#OrderInfoModule',
    canActivate:[AuthGuard]
  }
  ,
  {
    path: 'orders',
    component: LayoutComponent,
    loadChildren: './components/customer/order-details/order-details.module#OrderDetailsModule',
    canActivate:[AuthGuard]
  }
  ,
  {
    path: 'wishlist',
    component: LayoutComponent,
    loadChildren: './components/customer/wish-list/wish-list.module#WishListModule',
    canActivate:[AuthGuard]
  }
  ,
  {
    path: 'profile-edit',
    component: LayoutComponent,
    loadChildren: './components/customer/profile-edit/profile-edit.module#ProfileEditModule',
    canActivate:[AuthGuard]
  },
  {
    path: 'rating',
    component: LayoutComponent,
    loadChildren: './components/customer/rating-vendor/rating-vendor.module#RatingVendorModule',
    canActivate:[AuthGuard]
  }
  ,
  {
    path: 'password-edit',
    component: LayoutComponent,
    loadChildren: './components/customer/password-edit/password-edit.module#PasswordEditModule',
    canActivate:[AuthGuard]
  },
  {
    path: 'auto-login',
    //component: LayoutComponent,
    loadChildren: './components/shared/auto-login/auto-login.module#AutoLoginModule',
    canActivate:[AuthGuard]
  }
  ,
  {
    path: 'sign-out',
    //component: LayoutComponent,
    loadChildren: './components/customer/logout/logout.module#LogoutModule'//,
 //   canActivate:[AuthGuard]
  },
  {
    path: 'featured-products',
    component: LayoutComponent,
    loadChildren: './components/home/more-featured/more-featured.module#MoreFeaturedModule',
    canActivate:[AuthGuard]
  },
  {
    path: 'offers',
    component: LayoutComponent,
    loadChildren: './components/home/more-offers/more-offers.module#MoreOffersModule',
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
