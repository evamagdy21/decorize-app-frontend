import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderDetailsService } from '../order-details.service';
import { OrderDetailsViewModel } from '../order-details-view-model';
import { OrderDetailsItemViewModel } from '../order-details-item-view-model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderItem } from 'src/app/shared/view-models/order-view-model';
import { SelectItem } from 'src/app/shared/view-models/select-view-model';
import { CancleItemViewModel } from '../cancle-item-view-model';
import { RatingVendorService } from '../../rating-vendor/rating-vendor.service';
import { ratingVendorViewModel } from '../../rating-vendor/rating-vendor-view-model';
import { CancelOrderViewModel } from '../cancel-order-viewmodel';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.css']
})
export class OrderInfoComponent implements OnInit {
  QueryString: any;
  order: OrderDetailsViewModel;
  id: number;
  cancleModalRef: BsModalRef;
  selectedOrder: OrderDetailsViewModel;
  form: FormGroup;
  cancleForm: FormGroup;
  orderingList: OrderItem[] = [];
  reasonList: SelectItem[] = [];
  cancleReasonList: SelectItem[] = [];
  review: string = "";
  orderItemStatusList: SelectItem[] = [];
  selectedItem: OrderDetailsItemViewModel;
  cancleItemViewModel: CancleItemViewModel = new CancleItemViewModel();
  code:string="";
  CancelOrderViewMode:CancelOrderViewModel=new CancelOrderViewModel();
  value:number=5;
  ProductImage:string;
  ProductName:string;
  rating:ratingVendorViewModel=new ratingVendorViewModel();
  isAddedSuccessfully:boolean=false;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private formbuilder: FormBuilder,
    private modalService: BsModalService,
    private orderService: OrderDetailsService,
    private activatedRoute: ActivatedRoute,
    private ratingService: RatingVendorService,
    ) {

    this.order = new OrderDetailsViewModel();
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
    this.QueryString = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.GetOrderDetails(this.id);
    });


    this.orderService.getReasonList().subscribe(Response => {
      this.reasonList = Response.Data;
      this.reasonList.push({ "ID": 0, "Name": "اختر السبب", "Selected": true });
    });

    this.orderService.getCancleReasonList().subscribe(Response => {
      this.cancleReasonList = Response.Data;
      this.cancleReasonList.push({ "ID": 0, "Name": "  السبب", "Selected": true });
    });

    this.orderService.getStatusList().subscribe(Response => {
      this.orderItemStatusList = Response.Data;
      console.log('orderItemStatusList -------------------------------------------');
      console.log(this.orderItemStatusList)
    });
 
      
    this.value=5;
   
  }
  GetOrderDetails(id: number) {
    this.orderService.getOrderById(id).subscribe(res => {
      if (res.Success) {
        this.order = res.Data;
        console.log('order details -----------------------------------------------');
        console.log(this.order);
      }

    });
  }

  openCancleModal(template: TemplateRef<any>, orderitem: OrderDetailsItemViewModel /*item: OrderDetailsItemViewModel*/) {
    this.selectedItem = orderitem;
    this.cancleModalRef = this.modalService.show(template);
  }
  openReviewModal(template: TemplateRef<any>,orderitem: OrderDetailsItemViewModel) {
    this.selectedItem = orderitem;
    this.ProductImage=orderitem.Image,
    this.ProductName=orderitem.ProductName,
    this.cancleModalRef = this.modalService.show(template);
  }
  openCancleOrderModal(template: TemplateRef<any>,orderitem: OrderDetailsItemViewModel){
    this.selectedItem = orderitem;
    this.cancleModalRef = this.modalService.show(template);
  }
  get Reason() {
    return this.form.controls['ReasonId']
  }

  get CancleReason() {
    return this.cancleForm.controls['CancleReasonID']
  }

  saveCancleItem() {
    this.cancleModalRef.hide();
    this.cancleItemViewModel.CancellationReasonID = this.cancleForm.controls['CancleReasonID'].value;
    this.cancleItemViewModel.Details = this.review;
    this.cancleItemViewModel.OrderItemID = this.selectedItem.ID;
    //canceled Item 
    this.cancleItemViewModel.OrderItemStatusID = 6;
    console.log(this.cancleItemViewModel);
    this.order.Products.forEach(prod => { if (prod.ID == this.selectedItem.ID) { prod.IsCancelled = true; prod.StatusName = "طلب ملغي" } })
    this.orderService.cancleItem(this.cancleItemViewModel).subscribe(res => {
      if (!res.Success) {
        this.order.Products.forEach(prod => { if (prod.ID == this.selectedItem.ID) { prod.IsCancelled = false; prod.StatusName = this.orderItemStatusList.find(st => st.ID == prod.StatusId).Name } })
      }
      else {

        
        this.QueryString = this.route.params.subscribe(params => {
          this.id = +params['id'];
          this.GetOrderDetails(this.id);
        });
      }


    })
  }

saveRate(){

    this.rating.Review=this.review;
    this.rating.Code=this.selectedItem.Code;

    this.rating.RatingCount=this.value;
    this.rating.OrderItemID=this.selectedItem.ID
    console.log(' this.rating -------------------------------');
    console.log( this.rating)
    this.ratingService.AddRating(this.rating).subscribe(res=>{
        if(res.Success)
        {

          console.log(res)
          this.cancleModalRef.hide();
          this.QueryString = this.route.params.subscribe(params => {
            this.id = +params['id'];
            this.GetOrderDetails(this.id);
          });
        }
    });  
  }


    CancelOrder()
    {
      
        this.cancleModalRef.hide();
        this.CancelOrderViewMode.CancellationReasonID = this.cancleForm.controls['CancleReasonID'].value;
        this.CancelOrderViewMode.Details = this.review;
        this.CancelOrderViewMode.OrderID = this.order.ID;
        //canceled Item 
        this.CancelOrderViewMode.OrderStatusID = 6;
        console.log(this.CancelOrderViewMode);
    //  this.order.Products.forEach(prod => { if (prod.ID == this.selectedOrder.ID) { prod.IsCancelled = true; prod.StatusName = "طلب ملغي" } })
        this.orderService.cancelOrder(this.CancelOrderViewMode).subscribe(res => {
            if (!res.Success) {
                
              //  this.order.Products.forEach(prod => { if (prod.ID == this.selectedOrder.ID) { prod.IsCancelled = false; prod.StatusName = this.orderItemStatusList.find(st => st.ID == prod.StatusId).Name } })
            }
            else{
           
              this.GetOrderDetails(  this.order.ID);
            }
        },error=>{
            console.log(error)
        })
    
    
}

}
