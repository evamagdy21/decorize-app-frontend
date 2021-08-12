import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { departmentCategoriesViewModel } from '../../../shared/view-models/department-categories-view-model';
import { SearchService } from './search.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchKeyword:string;
  typeID:number=-1;
  departmentsList: departmentCategoriesViewModel[] = [];
  constructor(private searchService: SearchService,private activatedRoute: ActivatedRoute, private spinner: NgxSpinnerService, private route: Router) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams
    .filter(params => params.term)
    .subscribe(params => {
        console.log(params); 
      if(params.term != "" && params.term != undefined)
          this.searchKeyword = params.term;
    });

    this.spinner.show();
    this.searchService.get().subscribe(response => {
      if (response.Success) {
        console.log(response.Data)
        this.spinner.hide();
        this.departmentsList = response.Data as departmentCategoriesViewModel[];
      }
    });
  }

  search(txt: string) {
    this.searchKeyword=txt;
    //alert(this.searchKeyword)
    if (txt != "" ) {
      //console.log("txt : " + txt);
      var text = document.getElementById('keyword');
      let term = text.attributes['value'];
      let params: any = {};
      params.term = txt;
      if (this.typeID > 0) {
        //console.log("categoryId : "+this.typeID);
        params.departmentId = this.typeID;      //ekram
        //params.departmentid = this.typeID;
      }

      //console.log("params : " + JSON.stringify(params));
      this.route.navigate(['/search'], { queryParams: params });
    }else if(txt == ""&&this.typeID != 0){
      let params: any = {};
      //params.categoryId = this.typeID;
       params.departmentId = this.typeID; 
      this.route.navigate(['/search'], { queryParams: params });
     
    }

    //this.route.navigate(['/search'],{queryParams:{term:term}});
  }
}

