import { ProductViewModel } from "../shared/product/product-view-model";

export class FeaturedCategoryViewModel{
    ID:number;
    Name:string;
    
    Products:ProductViewModel[]=[];
}