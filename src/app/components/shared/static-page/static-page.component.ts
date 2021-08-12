import { Response } from '@angular/http';
import { PageViewModel } from './../../../shared/view-models/page-view-model';
import { StaticPageService } from './static-page.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Patterns } from 'src/app/common/patterns';
import { ResultViewModel } from 'src/app/shared/view-models/result-view-models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-static-page',
  templateUrl: './static-page.component.html',
  styleUrls: ['./static-page.component.css']
})
export class StaticPageComponent implements OnInit {
  form: FormGroup;
  processing: boolean = false;
  model: PageViewModel=new PageViewModel;
  resultViewModel: ResultViewModel;

  constructor(private formbuilder: FormBuilder, private activatedRoute: ActivatedRoute, private staticPageService: StaticPageService) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      if (params.has('name')) {
        let name: string = params.get("name");
        console.log(name);
        this.fillPage(name);
      }
    });
  }

  fillPage(name: string) {
    this.staticPageService.getStaticPage(name).subscribe(response => {
      this.model = response.Data;
      console.log(this.model);
    });
  }





}
