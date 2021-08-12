import { ContactUsViewModel } from './contact-us-view-model';
import { ApiService } from './../../../shared/services/api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  constructor(private apiService:ApiService) { }

  contactUs(body:ContactUsViewModel)
  {
    return this.apiService.post("/Page/ContactUS",body);
  }
}
