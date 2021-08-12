import { Injectable, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationShowService {
  public unseenCount: EventEmitter<Number>;

  constructor(private apiService: ApiService) {
    this.unseenCount = new EventEmitter<Number>();
  }

  getNotifications(pageIndex, pageSize) {
    return this.apiService.get(`/Notification/GetAllNotifications?pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }

  getUnseenCount() {
    return this.apiService.get(`/Notification/GetUnseenNotificationsCount`);
  }
}
