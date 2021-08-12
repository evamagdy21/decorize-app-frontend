import { SpecificationViewModel } from "../../product/product-grid/view-models/specification-view-model";
import { ProductViewModel } from "./product-view-model";

export class ItemSearchViewModel {
    ID: number = 0;
   
    Name: string = "";
    SelectedProduct : ProductViewModel;
    Specifications:SpecificationViewModel[];
}