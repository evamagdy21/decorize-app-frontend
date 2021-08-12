import { TokenService } from './token.service';
import { LocalizationService } from './localization.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { environment } from './../../../environments/environment';
import {
  Injectable,
  EventEmitter
} from '@angular/core';
import { RealtimeNotificationViewModel } from '../view-models/realtime-notification-view-model';
// declare the global variables  
declare var $: any;
@Injectable()
export class SignalRService {
  // Declare the variables  
  private proxy: any;
  private proxyName: string = 'decorizeHub';
  private connection: any;
  // create the Event Emitter  
  public discountNotifiy: EventEmitter<RealtimeNotificationViewModel>;
  public newProductNotify: EventEmitter<RealtimeNotificationViewModel>;
  public messageReceivedNotify: EventEmitter<RealtimeNotificationViewModel>;
  public changeOrderStatusNotify: EventEmitter<RealtimeNotificationViewModel>;
  public connectionEstablished: EventEmitter<Boolean>;
  public connectionExists: Boolean;
  private token: string;
  constructor(private localStorageService: LocalStorageService, private tokenService: TokenService) {
    //debugger;  
    // Constructor initialization  
    this.connectionEstablished = new EventEmitter<Boolean>();
    this.discountNotifiy = new EventEmitter<RealtimeNotificationViewModel>();
    this.newProductNotify = new EventEmitter<RealtimeNotificationViewModel>();
    this.messageReceivedNotify = new EventEmitter<RealtimeNotificationViewModel>();
    this.changeOrderStatusNotify = new EventEmitter<RealtimeNotificationViewModel>();
    this.connectionExists = false;
    // create hub connection  
    this.connection = $.hubConnection(environment.api_url);
    // create new proxy as name already given in top  
    this.proxy = this.connection.createHubProxy(this.proxyName);
    // register on server events  
    this.registerOnServerEvents();
    this.token = this.tokenService.getToken();
    console.log(this.token);
    // call the connecion start method to start the connection to send and receive events.  
    this.startConnection();
  }

  // check in the browser console for either signalr connected or not  
  private startConnection(): void {
    this.connection.start().done((data: any) => {
      console.log('Now connected ' + data.transport.name + ', connection ID= ' + data.id);
      this.connectionEstablished.emit(true);
      this.connectionExists = true;
    }).fail((error: any) => {
      console.log('Could not connect ' + error);
      this.connectionEstablished.emit(false);
    });
  }



  private registerOnServerEvents(): void {
    //debugger;  
    this.proxy.on('NotifyUserNewDiscount', (data: RealtimeNotificationViewModel) => {
      this.discountNotifiy.emit(data);
    });

    this.proxy.on('NotifyUserNewProduct', (data: RealtimeNotificationViewModel) => {
      this.newProductNotify.emit(data);
    });


    this.proxy.on('NotifyUserChangeOrder', (data: RealtimeNotificationViewModel) => {
      if (this.token != "" && this.token != undefined && this.token != null && data.Tokens != null && data.Tokens.length > 0) {
        if (data.Tokens.filter(t => t.trim() == this.token).length > 0)
          this.changeOrderStatusNotify.emit(data);
      }
    });

    this.proxy.on('NotifyUserNewMessage', (data: RealtimeNotificationViewModel) => {
      console.log("dsadsa1");
      if (this.token != "" && this.token != undefined && this.token != null && data.Tokens != null && data.Tokens.length > 0) {
       console.log("dsadsa");
        if (data.Tokens.filter(t => t.trim() == this.token.trim()).length > 0)
          this.messageReceivedNotify.emit(data);
      }
    });
  }

}  