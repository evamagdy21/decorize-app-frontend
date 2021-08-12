import { environment } from './../../../../environments/environment';

import { Component, OnInit } from '@angular/core';
import { AutoLoginService } from "./auto-login.service";
import { ActivatedRoute } from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'auto-login',
    templateUrl: 'auto-login.component.html',
    styleUrls: ['auto-login.component.css']
})
export class AutoLoginComponent  implements OnInit  {
  
    returnUrl:string="";

    constructor(private activatedRoute : ActivatedRoute,private autoLoginService:AutoLoginService){}
    
    ngOnInit() {
        this.activatedRoute.paramMap.subscribe(params => {
            
            this.activatedRoute.queryParams
            .filter(params => params.returnUrl)
            .subscribe(params => {
              console.log(params); // {order: "popular"}
      
              this.returnUrl = params.returnUrl;
              console.log(this.returnUrl); // popular
            });
              
        });
        this.autoLoginService.autoLogin().subscribe(res=>{
            //this.redirect(this.returnUrl, res.Data)
        });
    }
 
    // redirect(returnUrl:string,code:string){
    //    // window.open(`https://takhfeed-vendor.mohamed-sadek.com/auto-login/${code}`,"_self");
    //    if(returnUrl=="Vendor"){
    //  //   window.open(`http://localhost:4200/auto-login/${code}`,"_self");    
    //     window.open(`${environment.vendor_url}/auto-login/${code}`,"_self");    
    //    }else if(returnUrl=="Admin"){
    //     //    alert(`${environment.admin_url}`);
    //     window.open(`${environment.admin_url}/auto-login/${code}`,"_self");            
    //   //  window.open(`http://takhfeed-vendor.mohamed-sadek.com/auto-login/${code}`,"_self");    
        
    // }else{
    //     //   alert("no thing") 
    //    }
    
    // }
}

