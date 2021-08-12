import { CancleItemViewModel } from './cancle-item-view-model';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit, TemplateRef } from '@angular/core';
import { CustomerCartService } from '../../../shared/services/cart.service';
import { SelectItem } from '../../../shared/view-models/select-view-model';
import { OrderItem } from '../../../shared/view-models/order-view-model';
import { OrderDetailsService } from './order-details.service';
import { OrderDetailsItemViewModel } from './order-details-item-view-model';
import { OrderDetailsViewModel } from './order-details-view-model';
import { LocalStorageService } from 'angular-2-local-storage/dist/local-storage.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RefundViewModel } from './refund-view-model';
import { CancelOrderViewModel } from './cancel-order-viewmodel';
import { PageEvent } from '@angular/material';


@Component({
    moduleId: module.id,
    selector: 'order-details',
    templateUrl: './order-details.component.html',
    styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

    skip:number=1;
    pageSize:number=3; 
    Records:number;

    modalRef: BsModalRef;
    cancleModalRef: BsModalRef;
    userName: string = "";
    orderingList: OrderItem[] = [];
    orderStatusList: SelectItem[] = [];
    reasonList: SelectItem[] = [];
    cancleReasonList: SelectItem[] = [];
    orderId: number = 0;
    orders: OrderDetailsViewModel[] = [];
    refundViewModel: RefundViewModel = new RefundViewModel();
 
    CancelOrderViewMode:CancelOrderViewModel=new CancelOrderViewModel();
    review: string = "";
    selectedItem: OrderDetailsItemViewModel;
    selectedOrder: OrderDetailsViewModel;
    form: FormGroup;
    cancleForm: FormGroup;
    constructor(
        private activatedRoute: ActivatedRoute,
        private route: Router,
        private formbuilder: FormBuilder,
        private cartervice: CustomerCartService,
        private modalService: BsModalService,
        private orderDetailsService: OrderDetailsService,
        private localStorageService: LocalStorageService) {
     
        this.userName = this.localStorageService.get("userName");
        this.form = this.formbuilder.group({
            ReasonId: ['', [Validators.required]]
        });

        this.cancleForm = this.formbuilder.group({
            CancleReasonID: ['', [Validators.required]]
        });
        this.orderingList = [
            { ID: 1, Name: "shared.order-by-lowest-price", Selected: true },
            { ID: 2, Name: "shared.order-by-highest-price", Selected: false },
            { ID: 3, Name: "shared.order-by-newest", Selected: false }];
    }
    ngOnInit() {
  
        this.orderDetailsService.getOrderStatusList().subscribe(Response => {
            this.orderStatusList = Response.Data;
             console.log('orderStatusList -------------------------------------------');
             console.log(this.orderStatusList )
        });
        this.orderDetailsService.getReasonList().subscribe(Response => {
            this.reasonList = Response.Data;
            this.reasonList.push({ "ID": 0, "Name": "اختر السبب", "Selected": true });
        });

        this.orderDetailsService.getCancleReasonList().subscribe(Response => {
            this.cancleReasonList = Response.Data;
            this.cancleReasonList.push({ "ID": 0, "Name": "  السبب", "Selected": true });
        });
        this.GetCustomerOrders();
   
    }


    GetCustomerOrders(event?:PageEvent)
    {
        this.ChangePage(event);
      
        this.orderDetailsService.getOrdersList(this.skip,this.pageSize).subscribe(response => {
            if (response.Success) {

                this.orders = response.Data.Result;
                console.log('this.Customerorders------------------------------------')
                console.log(response)
                this.Records=response.Data.Records;
            }
        })
    }

    openCancleModal(template: TemplateRef<any>,order:OrderDetailsViewModel) {
        this.selectedOrder = order;
        this.cancleModalRef = this.modalService.show(template);
    }
    get Reason() {
        return this.form.controls['ReasonId']
    }

    get CancleReason() {
        return this.cancleForm.controls['CancleReasonID']
    }

    save() {
        this.modalRef.hide();
        this.refundViewModel.RefundReasonID = this.form.controls['ReasonId'].value;
        this.refundViewModel.Details = this.review;
        this.refundViewModel.OrderItemID = this.selectedItem.ID;
        console.log(this.refundViewModel);
        this.orders.forEach(order => { order.Products.forEach(prod => { if (prod.ID == this.selectedItem.ID) { prod.IsRefunded = true; prod.StatusName = "مرتجع" } }) })
        this.orderDetailsService.refundItem(this.refundViewModel).subscribe(res => {
            if (!res.Success) {
                this.orders.forEach(order => { order.Products.forEach(prod => { if (prod.ID == this.selectedItem.ID) { prod.IsRefunded = false; prod.StatusName = this.orderStatusList.find(st => st.ID == prod.StatusId).Name } }) })
            }
        })
    }

    saveCancelOrder() {
        this.cancleModalRef.hide();
        this.CancelOrderViewMode.CancellationReasonID = this.cancleForm.controls['CancleReasonID'].value;
        this.CancelOrderViewMode.Details = this.review;
        this.CancelOrderViewMode.OrderID = this.selectedOrder.ID;
        
        this.CancelOrderViewMode.OrderStatusID = 6;
        console.log(this.CancelOrderViewMode);
        //this.orders.forEach(order => { order.Products.forEach(prod => { if (prod.ID == this.selectedOrder.ID) { prod.IsCancelled = true; prod.StatusName = "طلب ملغي" } }) })
        this.orderDetailsService.cancelOrder(this.CancelOrderViewMode).subscribe(res => {
            if (!res.Success) {
                
                this.orders.forEach(order => { order.Products.forEach(prod => { if (prod.ID == this.selectedOrder.ID) { prod.IsCancelled = false; prod.StatusName = this.orderStatusList.find(st => st.ID == prod.StatusId).Name } }) })
            }
            else{
           
                this.GetCustomerOrders();
            }
        },error=>{
            console.log(error)
        })
    }



    ChangePage(event?:PageEvent)
    {
      console.log(event);   
      if(event!=null)    
      {
        this.Records=event.length;  
        if((event.length/event.pageSize)>=event.pageIndex)
        {
          this.skip=event.pageIndex+1;        
          console.log("event.length/event.pageSize");        
          console.log(event.length/event.pageSize)
          console.log(this.skip);
        }        
        else if(event.previousPageIndex>event.pageIndex)   
        {
          this.skip=event.pageSize*(event.previousPageIndex-1);  
          console.log(this.skip);        
        }
        else
        {
          this.skip=event.pageSize*(event.previousPageIndex+1);  
          console.log(this.skip);     
        }   
        this.pageSize=event.pageSize;   
      }
      else
      {
        this.skip=1;
        this.pageSize=9;      
      }
    }

}

