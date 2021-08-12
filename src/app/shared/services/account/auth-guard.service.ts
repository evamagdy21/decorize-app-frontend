import { CanActivate, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { CustomerService } from "./customer.service";
import { TokenService } from '../../../shared/services/token.service';
@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {
    constructor(private router: Router, private customerService: CustomerService, private tokenStorage: TokenService) { }
    canActivate(): boolean {
        let logged = this.tokenStorage.getToken()
        if (logged)
            return true;
        else {
            this.router.navigateByUrl('/login');
            return false;
        }
    }
}