import { ShippingAddressViewModel } from "../shipping-address/shipping-address-view-model.model";
import { CartItem } from "../../../shared/view-models/cart-item-model";

export class OrderCreateViewModel {
        PaymentMethodID:number=1;
        ShippingCost:number=0;
        CashOnDeliveryCost:number=0;
        ProductsCost:number=0;
        ShippingAddressID:number;
       // ShippingAddress:ShippingAddressViewModel=new ShippingAddressViewModel();
        Products:CartItem[];
        Note:string="";
      
}