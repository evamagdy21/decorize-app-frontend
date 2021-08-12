import { ApiService } from "../../../shared/services/api.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private apiService: ApiService) { }
  get() {
    //return this.apiService.get(`/category/GetCategoriesReletedToDepartments`)
    return this.apiService.get(`/category/GetDepartmentsList`)
  }

}
