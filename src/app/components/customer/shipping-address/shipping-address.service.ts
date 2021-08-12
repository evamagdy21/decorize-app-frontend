import { ApiService } from './../../../shared/services/api.service';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ShippingAddressViewModel } from './shipping-address-view-model.model';
import { identifierModuleUrl, identifierName } from '@angular/compiler';

@Injectable()
export class shippingAddressService {
    getShippingRegionsList() {
       // return this.apiService.get('/GetShippingZoneList');
        return this.apiService.get('/ShippingRegion/GetList');
    }

    constructor(private apiService: ApiService) {

    }

    postOrUpdate(body: ShippingAddressViewModel) {
        //console.log(body.ID);
        //console.log("object"+JSON.stringify(body));
    // if(body.ID==0)
        return this.apiService.post('/customer/AddShippingAddress',body);
    //  else
    //     return this.apiService.update('/customer/PutShippingAddress',body);
    //   }
    }

    // create(address: ShippingAddressViewModel): Observable<ResultViewModel> {
    //     //console.log(address)
    //     return this.apiService.post('/AddShippingAddress', address);
    // }
    get() {
        return this.apiService.get('/customer/GetShippingAddress');
    }
    getShoppingAdressByID(id:number) {
        return this.apiService.get('/customer/GetShippingAddressByID?AddressID='+id);
    }
    getAllShoppingAddresses() {
        return this.apiService.get('/customer/GetAlltShippingAddresses');
    }
    DeleteAddress(id:number)
    {
        return this.apiService.remove('/customer/DeleteShippingAddress?id='+id);
    }
   
}