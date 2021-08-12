import { ResultViewModel } from './../../../shared/view-models/result-view-models';
import { ApiService } from './../../../shared/services/api.service';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderCreateViewModel } from './order-create-view-model.model';

@Injectable(
    {  providedIn: 'root'}
)
export class CheckoutService {
    

    constructor(private apiService: ApiService) {

    }

    create(order: OrderCreateViewModel): Observable<ResultViewModel> {
        //console.log("order"+JSON.stringify(order));
        return this.apiService.post('/order/Post', order);
    }
    payOnline(): Observable<ResultViewModel> {
       
        return this.apiService.get('/order/PayOnline');
    }

}