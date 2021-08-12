import { ResultViewModel } from './../../../shared/view-models/result-view-models';
import { CustomerService } from './../../../shared/services/account/customer.service';

import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'confirm-email',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  orderId: number = 0;
  resultViewModel: ResultViewModel;
  constructor(private customerService: CustomerService, private activatedRoute: ActivatedRoute) {

  }
  ngOnInit(): void {
 
    this.activatedRoute.paramMap.subscribe(parms => {
      let code = parms.get('code');
    
      this.customerService.confirmAccount(code).subscribe(res => {
        this.resultViewModel = res;
      
        if (res.Success && res.Data == true) {
        }
      })
    });
  }

}
