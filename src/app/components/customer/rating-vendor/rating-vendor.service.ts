import { ApiService } from './../../../shared/services/api.service';

import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ratingVendorViewModel } from './rating-vendor-view-model';
import { ResultViewModel } from '../../../shared/view-models/result-view-models';

@Injectable({
    providedIn: 'root'
})

export class RatingVendorService {

    constructor(private apiService: ApiService) { }

    IsRatedBefore(code:string):Observable<ResultViewModel>  {
       return this.apiService.get(`/OrderItemReview/IsRatedBeforeByCustomer?code=${code}`);
    }

    AddRating(rating: ratingVendorViewModel): Observable<ResultViewModel>  {
       return this.apiService.post('/OrderItemReview/AddProductReview',rating);
    }
}