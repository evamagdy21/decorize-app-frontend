import { CategoryViewModel } from "./category-view-model";

export class departmentCategoriesViewModel {
    ID:number;
    Name: string;
    Image: string;
    Icon: string;
    CssClass: string;
    IsActive: true;
    DisplayOrder: number = 1;
    Categories: CategoryViewModel[] = [];
    IsSelected: boolean;
}