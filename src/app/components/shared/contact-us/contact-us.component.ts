import { ContactUsService } from './contact-us.service';
import { ContactUsViewModel } from './contact-us-view-model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Patterns } from 'src/app/common/patterns';
import { ResultViewModel } from 'src/app/shared/view-models/result-view-models';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  form: FormGroup;
  processing: boolean = false;
  model: ContactUsViewModel;
  resultViewModel: ResultViewModel;

  constructor(private formbuilder: FormBuilder, private contactUsService: ContactUsService) {
    this.createForm();
  }

  ngOnInit() {
  }


  createForm(): void {
    this.form = this.formbuilder.group({
      Name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      Email: ['', [Validators.required, Validators.pattern(Patterns.Email)]],
      Message: ['', [Validators.required, Validators.minLength(2)]],
    });
  }


  save(): void {
    //console.log("form : " + JSON.stringify(this.form.value));
    this.processing = true;
    let contactus = Object.assign({}, this.model, this.form.value) as ContactUsViewModel;
    // console.log("view Model : " + JSON.stringify(contactus));
    this.contactUsService.contactUs(contactus).subscribe(response => {
      this.resultViewModel = response;
      this.processing = false;
      if (response.Success)
        this.form.reset();
    }, (error) => {
      this.processing = false;
      this.resultViewModel.Success = false;
      this.resultViewModel.Message = "Please try again later";
    });
  }
}
