import { ApiService } from '../../../shared/services/api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StaticPageService {

  constructor(private apiService:ApiService) { }

  getStaticPage(name:string)
  {
    return this.apiService.get(`/Page/GetPageByName?name=${name}`);
  }
}
