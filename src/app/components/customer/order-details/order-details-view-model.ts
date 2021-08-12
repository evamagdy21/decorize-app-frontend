import { OrderDetailsItemViewModel } from "./order-details-item-view-model";

export class OrderDetailsViewModel {
    ID: number = 0;
    OrderNumber:number=0;
    ZoneID: number = 0;
    CompanyID: number = 0;
    //  int StatusID 
    ZoneName: string = "";
    Street: string = "";
    Building: string = "";
    Floor: string = ""
    Apartment: string = "";
    Longitude: string = "";
    Latitude: string = "";
    //  string StoreName 
    ShippingCompanyName: string = "";
    CustomerName: string = "";
    //  string StatusName 
    Mobile: string = "";
    Email: string = "";
    Date: string = "";
    // TimeSpan Time 
    //  string Guid 
    Active: boolean = true;
    Weight: number = 0;
    Note: string = "";
    Total: number = 0;
    ShippingCost: number = 0;
    NetAmount: number = 0;
    Amount: number = 0;
    PaymentMethodID: number = 0;
    PaymentMethodName: string = "";
    StatusID: number = 0;
    StatusName: string = "";
    CountryName:string;
    CityName:string;
    RegionName:string;
    //    int PaymentMethodID 
    //   string PaymentMethodName 
    Products: OrderDetailsItemViewModel[] = [];

}