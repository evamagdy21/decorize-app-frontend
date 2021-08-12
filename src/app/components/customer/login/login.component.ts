import { WishListService } from './../wish-list/wish-list.service';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from '../../../shared/services/account/auth.service';
import { TokenService } from '../../../shared/services/token.service';


@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
    form: any = {
        username: null,
        password: null
    };
    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = '';
    roles: string[] = [];
    constructor(private wishListService: WishListService,
        private activatedRoute: ActivatedRoute,
        private route: Router,
        private authService: AuthService,
        private tokenStorage: TokenService) { }
    ngOnInit() {

        if (this.tokenStorage.getToken()) {
            this.isLoggedIn = true;
            this.roles = this.tokenStorage.getUser().roles;
        }
    }

    onSubmit(): void {
        const { username, password } = this.form;

        this.authService.login(username, password).subscribe(
            data => {
                this.tokenStorage.saveToken(data.accessToken);
                this.tokenStorage.saveUser(data);

                this.isLoginFailed = false;
                this.isLoggedIn = true;
                this.route.navigateByUrl('/home');
                this.wishListService.get().subscribe(res => {
                    if (res.Success) {
                        res.Data.forEach(prod => {
                            prod.AddedToWishList = true;
                            this.wishListService.AddItemToWishList(prod);
                        })
                    }
                });
                this.roles = this.tokenStorage.getUser().roles;
                
            },
            err => {
                this.errorMessage = err.error.message;
                this.isLoginFailed = true;
            }
        );
    }

    reloadPage(): void {
        window.location.reload();
    }

}

