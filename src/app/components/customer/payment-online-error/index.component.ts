
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
   // orderId:number=0;
    constructor(){

    }
    ngOnInit(): void {
     /*  this.activatedRoute.paramMap.subscribe(parms => {
      this.orderId = parseInt(parms.get('id'));
      //console.log("this.productCode : " + this.orderId);
    }); */
    }

}
