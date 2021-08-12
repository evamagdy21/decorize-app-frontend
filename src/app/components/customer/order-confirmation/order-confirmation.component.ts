
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'order-confirmation',
    templateUrl: './order-confirmation.component.html',
    styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {
    orderId:number=0;
    constructor(private activatedRoute: ActivatedRoute){

    }
    ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe(parms => {
      this.orderId = parseInt(parms.get('id'));
      //console.log("this.productCode : " + this.orderId);
    });
    }

}
