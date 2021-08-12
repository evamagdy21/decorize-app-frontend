import { Component, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'product-rating',
    templateUrl: 'product-rating.component.html',
    styleUrls: ['product-rating.component.css']
})
export class ProductRatingComponent {
@Input() value:number;
constructor(){
    //console.log(this.value)
}
}
