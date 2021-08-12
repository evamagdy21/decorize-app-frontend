import { SpecificationValueViewModel } from "./specification-value-view-model";

export interface Specification
{
      ID:number ,
      SpecificationName :string,
      SpecificationValueName:string,
      Values:SpecificationValueViewModel[]
}