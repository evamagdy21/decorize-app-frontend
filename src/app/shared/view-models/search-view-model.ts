export class SearchViewModel {
    text: string = "";
    departmentId: number = 0;
    categoryId: string = "";
    conditionId: string = "";
    brandId: string = "";
    specificationId: string = "";
    fromPrice:number=-1;
    toPrice:number=-1;
    orderBy: number = 1;
    isAscending: boolean = false;
    pageIndex: number = 1;
    constructor() {
        this.text="";
        this.departmentId=-1;
        this.categoryId="";
        this.conditionId="";
        this.brandId="";
        this.specificationId="";
        this.orderBy=1;
        this.isAscending=false;
        this.pageIndex=1;
    }
}
