
import { Injectable } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { ResultViewModel } from '../../../shared/view-models/result-view-models';

import { } from "@angular/http";
import { SearchViewModel } from '../../../shared/view-models/search-view-model';
import { HttpParams, HttpClient,HttpErrorResponse  } from "@angular/common/http";
import { IProduct } from '../../..//shared/view-models/product-view-model';
import { catchError, tap, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl = '../../../../assets/json files/data.json';


  constructor(private apiService: ApiService, private http: HttpClient) { }
  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productUrl)
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  getProduct(id: number): Observable<IProduct | undefined> {
    return this.getProducts()
      .pipe(
        map((products: IProduct[]) => products.find(p => p.ID === id))
      );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
  // new functions
  getFeaturedProducts() {
    return this.http.get('../../../../assets/json files/data.json');
  }
  getOffers() {
    return this.http.get('../../../../assets/json files/data.json');
  }
  getDepartments() {
    return this.http.get('../../../../assets/json files/departments.json');
  }
  getAllBrands() {
    return this.http.get('../../../../assets/json files/brands.json');
  }
  getAllProducts2() {
    return this.http.get('../../../../assets/json files/data.json');
  }
// old functions
  getProductsList() {
    return this.apiService.get(`/product/search`);
  }
  getSpecificationsList() {
    return this.apiService.get(`/specification/GetSpecificationsWithValues`);
  }
  getProductReviews(id: number): any {
    return this.apiService.get(`/OrderItemReview/GetProductsReview?productId=${id}`)
  }

  // getProduct(id: number): Observable<ResultViewModel> {
  //   let params: HttpParams = new HttpParams();
  //   params.append("id", id.toString());
  //   return this.apiService.get(`../../../../assets/json files/data.json?productId=${id}`);
  // }
  getItem(id: number, specValueId: number, fetchProduct: number): Observable<ResultViewModel> {
    let params: HttpParams = new HttpParams();
    params.append("id", id.toString());
    return this.apiService.get(`/product/GetItem?productId=${id}&specValueId=${specValueId}&fetchProduct=${fetchProduct}`);
  }
  getRelatedOffers(productID: number, typeID: number): Observable<ResultViewModel> {
    let params: HttpParams = new HttpParams();
    params.append("productID", productID.toString());
    params.append("typeID", typeID.toString());
    return this.apiService.get(`/product/search`);
  }
  getBestDailyOffers(): Observable<ResultViewModel> {
    return this.apiService.get('/product/search');
  }


  getNewFeaturedProducts(PageIndex: number = 0, PageSize: number = 9): Observable<ResultViewModel> {
    return this.apiService.get(`/SearchLists/GetAllFeaturedProductsForWeb?PageIndex=${PageIndex}&PageSize=${PageSize}`);
  }

  getAllNewOffers(PageIndex: number = 0, PageSize: number = 9): Observable<ResultViewModel> {
    return this.apiService.get(`/SearchLists/GetAllOffers?PageIndex=${PageIndex}&PageSize=${PageSize}`);

  }

  getProductsCount(params: HttpParams): Observable<ResultViewModel> {
    return this.apiService.get('/product/getProductsCount', params);
  }
  // getProducts(params: HttpParams): Observable<ResultViewModel> {
  //   //console.log(params);
  //   //console.log("getProducts : "+JSON.stringify(params));
  //   return this.apiService.get('/product/search', params);
  // }

  filterByCategories(params: HttpParams): Observable<ResultViewModel> {
    //console.log("filterByCategories : "+JSON.stringify(params));
    return this.apiService.get('/search/FilterByDepartments', params);
  }
  filterByBrands(params: HttpParams): Observable<ResultViewModel> {

    return this.apiService.get('/search/FilterByBrands', params);
  }
  filterByConditions(params: HttpParams): Observable<ResultViewModel> {
    return this.apiService.get('/search/FilterByConditions', params);
  }
  filterBySpecifications(params: HttpParams): Observable<ResultViewModel> {
    return this.apiService.get('/search/FilterBySpecifications', params);
  }

  // getProductSpecifications(id: number): Observable<ResultViewModel> {
  //   let params: HttpParams = new HttpParams();
  //   params.append("id", id.toString());
  //   return this.apiService.get('/product/search', params);
  // }

  getProductSpecifications(id: number): Observable<ResultViewModel> {
    let params: HttpParams = new HttpParams();
    params.append("productId", id.toString());
    return this.apiService.get(`/product/GetProductSpecifications?productId=${id}`);
  }
  getSpecificationsForItem(id: number): Observable<ResultViewModel> {
    return this.apiService.get(`/item/GetSpecificationByItemID?productId=${id}`);

  }

  getAllProducts(id: number): Observable<ResultViewModel> {
    return this.apiService.get(`/item/GetItem?productId=${id}`);

  }

  GetFeaturedProductAndOffers(): Observable<ResultViewModel> {
    return this.apiService.get('/Product/GetFeatured/Offer');

  }
}
