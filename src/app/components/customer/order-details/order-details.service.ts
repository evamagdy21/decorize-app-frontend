import { ApiService } from './../../../shared/services/api.service';
import { CancleItemViewModel } from './cancle-item-view-model';
import { RefundViewModel } from './refund-view-model';

import { Injectable } from '@angular/core';
import { CancelOrderViewModel } from './cancel-order-viewmodel';
import { Observable } from 'rxjs';
import { ResultViewModel } from 'src/app/shared/view-models/result-view-models';

@Injectable()
export class OrderDetailsService {
   




    constructor(private apiService: ApiService) {

    }
    getOrdersList(PageIndex:number=0,PageSize:number=3): Observable<ResultViewModel> {
        return this.apiService.get(`/order/GetCustomerOrders?pageIndex=${PageIndex}&pageSize=${PageSize}`);
      }
    


    //   getOrdersList(skip:number,pageSize:number): any {
    //     return this.apiService.get(`/order/GetCustomerOrders`);
    // }


    getOrderById(id: number) {
        return this.apiService.get(`/order/GetOrderById/${id}`);
    }

    getStatusList() {
        return this.apiService.get(`/order/GetOrderItemStatusList`);
    }

    getOrderStatusList() {
        return this.apiService.get(`/Order/GetOrderStatusListForCustomer`);
    }
    getReasonList() {
        return this.apiService.get(`/RefundReason/GetList`);
    }

    getCancleReasonList() {
        return this.apiService.get(`/CancellationReason/GetList`);
    }


    refundItem(model: RefundViewModel) {
        return this.apiService.post(`/RefundRequest/Post`, model);
    }

    cancleItem(model: CancleItemViewModel) {
        return this.apiService.post(`/CancellationRequest/Post`, model);
    }

    cancelOrder(model: CancelOrderViewModel) {
        return this.apiService.post(`/CancellationRequest/CancelOrder`, model);
    }
}