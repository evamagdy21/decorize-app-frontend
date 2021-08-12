import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor( private apiService: ApiService) { }

  getCountryList() {
    return this.apiService.get('/Country/GetList');
  }
  getCityList(counryID:number) {
    return this.apiService.get('/City/GetList?CountryID='+counryID);
  }
  getAreaList(cityID:number) {
    return this.apiService.get('/Region/GetList?CityID='+cityID);
  }
}
