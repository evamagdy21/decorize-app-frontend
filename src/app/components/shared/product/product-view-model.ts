import { SpecificationViewModel } from "../../product/product-grid/view-models/specification-view-model";

export class ProductViewModel {

    ID: number = 1;
    ItemID:number = 0;
    ItemName: number = 0;
    Code: string = "";
    Name: string = "";
    Price:number=0;
    Condition:string="";
    Category:string="";
    Vendor:string="";
    Department:string="";
    Brand:string="";
    Description: string = "";
    MeanFeatures:string="";
    VendorComment: string = "";
    VendorReferenceNumber: string = "";
    Stock: number = 1;
    MinStockQuantity: number = 1;
    OrderMinimumQuantity: number = 1;
    OrderMaximumQuantity: number = 1;
    Weight: number = 1;
    Length: number = 1;
    Width: number = 1;
    Image: string = "assets/img/prodect-list/1.jpg";
    ImageURL:string;
    Images:string[]=[];
    Height: number = 1;
    Views: number = 1;
    IsShowInSearch: boolean = true;
    IsFeatured: boolean = true;
    IsFreeShipping: boolean = true;
    IsAdminApproved: boolean = true;
    ProductUrl:string="";
    RatingCount: number = 0;
    RatingAvg: number = 0;
    OldPrice: number = 0;
    NewPrice: number = 0;
    IsActive: boolean = true;
    DisplayOrder: number = 1;
    AddedToWishlist: boolean;
    ValidateMessage="";
    AddedToCart: boolean =false;
    QTY:number=0;
    MaxQTY:number=0;
    Discount:number=0;
    Specifications:SpecificationViewModel[];
    IsMinPrice:boolean;
    IsMaxPrice:boolean;

    IsValid:boolean=true;
}