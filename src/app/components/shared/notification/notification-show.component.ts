import { Time } from '@angular/common';
import { Router } from '@angular/router';
import { Route } from '@angular/router';
import { Component, OnInit, HostListener, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { NotificationViewModel } from './notification-view-model';
import { NotificationShowService } from './notification-show.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CustomerService } from 'src/app/shared/services/account/customer.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification-show.component.html',
  styleUrls: ['./notification-show.component.css']
})


export class NotificationShowComponent implements OnInit {
  public scrollbarOptions = { axis: 'y', theme: "dark-3" };
  skip: number = 0;
  isLoading = false;
  modalRef: BsModalRef;
  pageSize: number = 10;
  notificationList: NotificationViewModel[] = [];
  timeZone: number;
  content: string;
  @ViewChild('template')
  private msgTempRef: TemplateRef<any>

  option = { PageSize: 10, PageIndex: 0, Records: 0, Pages: 0 };
  constructor(private router: Router,
    private modalService: BsModalService,
    private notificationService: NotificationShowService,
    private customerService:CustomerService,) {
    this.getTimeZoneOffset();
  }

  ngOnInit() {
    
   if(this.customerService.hasAccessToken())
   {
     this.getNotification();
   }
   
   
  }


  getTimeZoneOffset() {
    var timezoneDiff = new Date().getTimezoneOffset() // difference in minutes from GMT
    this.timeZone = Math.trunc(timezoneDiff * -1);
  }


  getNotification() {
    this.option.PageIndex += 1;
    this.isLoading = true;
    this.notificationService.getNotifications(this.option.PageIndex, this.pageSize).subscribe(response => {
      this.option.PageIndex = response.Data.PageIndex;
      this.option.Pages = response.Data.Pages;
      this.option.Records = response.Data.Records;
      this.notificationList.push(...response.Data.Result);
      console.log(this.notificationList.length);
      this.notificationService.unseenCount.emit(0);
      this.isLoading = false;
    });
  }


  redirect(orderID: Number, notificationTypeID: number, content: string) {
    console.log(orderID);
    if (orderID > 0)
      this.router.navigateByUrl(`/order-info/${orderID}`);
    else {
      this.openModal(this.msgTempRef);
      this.content = content;
    }
  }


  @HostListener('scroll', ['$event'])
  onScroll(event: any) {
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
      if (this.option.PageIndex <= this.option.Pages) {
        this.getNotification();
      }
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);

  }

}
