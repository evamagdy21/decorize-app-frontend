import { SpecificationValueViewModel } from "./specification-value-view-model";

export class SpecificationViewModel{
    ID:number=0;
    Name:string="";
    Icon:string="";
    ValuesCount:number=1;
    CssClass:string="";
    IsActive:boolean=true;
    DisplayOrder = 1;
    Values:SpecificationValueViewModel[]=[];
}