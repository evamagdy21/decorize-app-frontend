export class OrderDetailsItemViewModel {
    ID: number = 0;
    ProductID: number = 0;
    // int StoreID 
    ProductCode: string = "";
    ProductName: string = "";
    CategoryName: string = "";
    //  string StoreName 
    //  string StoreEmail 
    BrandName: string = "";
    ConditionName: string = "";
    Price: number = 0;
    Quantity: number = 0;
    Image: string = "";
    RatingCount: number = 0;
    IsRated: boolean = false;
    IsCancelled: boolean = false;
    IsRefunded: boolean = false;
    Status: string = "";
    StatusId: number = 0;
    StatusName: string = "";
    VendorName: string = "";
    Selected: boolean = false;
    Code:string;
}