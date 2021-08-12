import { ProductViewModel } from "../shared/product/product-view-model";

export class ItemViewModel{
    public  ID:number=0 ;
    public  CategoryName:string="" ;
    public  Name:string="" ;
    public  Description:string="" ;
    public  MainFeatures:string="" ;
    public  RatingCount:number=0  ;
    public  MainImage :string="";
    public Product : ProductViewModel = new ProductViewModel();
}