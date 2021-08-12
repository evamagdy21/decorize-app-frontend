
import { FilterOption } from "./fiter-option-model";
import { Specification } from "../../components/product/product-grid/view-models/specification-model";

export class SearchCriteria
{
    Term:string;
    DepartmentID:number;
    Categories:FilterOption[];
    Brands:FilterOption[];
    Conditions:FilterOption[];
    Specifications:Specification[];
    OrderBy:number;
}