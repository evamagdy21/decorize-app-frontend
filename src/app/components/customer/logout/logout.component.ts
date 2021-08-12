import { AutoLoginService } from './../../shared/auto-login/auto-login.service';
import { TokenService } from './../../../shared/services/token.service';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage/dist/local-storage.service';

@Component({
    moduleId: module.id,
    selector: 'logout',
    templateUrl: 'logout.component.html',
    styleUrls: ['logout.component.css']
})
export class LogoutComponent implements OnInit{
   
    constructor(private localStoragService: LocalStorageService, private router:Router, private activatedRoute:ActivatedRoute,private tokenService: TokenService, private autoLoginService:AutoLoginService) {
    }
    returnUrl:string="";
    /**
     *
     */
    ngOnInit(){
        //alert("in init");
        this.activatedRoute.paramMap.subscribe(params => {
            
            this.activatedRoute.queryParams
            .filter(params => params.ReturnUrl)
            .subscribe(params => {
              console.log(params); // {order: "popular"}
      
              this.returnUrl = params.ReturnUrl;
              console.log(this.returnUrl); // popular
            });
              
        });
    
      
    }
    



}
