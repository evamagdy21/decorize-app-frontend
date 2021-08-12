import { CanActivate, Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from "@angular/router";
import { Injectable } from "@angular/core";
import { ProductViewModel } from "../shared/product/product-view-model";
import { ProductService } from "../product/product-grid/product.service";
import { Observable, observable } from "rxjs";
import { ResultViewModel } from "../../shared/view-models/result-view-models";
import { map } from "rxjs-compat/operator/map";

@Injectable({
    providedIn: 'root'
})

export class ProductResolver implements Resolve<ResultViewModel> {
    constructor(private productService: ProductService, private router: Router) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResultViewModel> {
        // alert("resolve")
        let productId = +route.params['id'];
        if (isNaN(productId)) {
            this.router.navigateByUrl("/")
            return Observable.of(null);
        }
        // return this.productService.getProduct(productId);
    };
}