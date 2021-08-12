import { ProductViewModel } from "../shared/product/product-view-model";

export class ItemDetailsViewModel{
    public  ID:number=0 ;
    public  CategoryName:string="" ;
    public  Name:string="" ;
    public  Description:string="" ;
    public  MainFeatures:string="" ;
    public  RatingCount:number=0  ;
    public  MainImage :string="";
    public Products : ProductViewModel[] = [];
}