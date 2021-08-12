import { TokenService } from './token.service';
import { LocalizationService } from './localization.service';


import { Injectable } from '@angular/core';
// import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { map, catchError } from 'rxjs/operators';
import { Headers, Http } from '@angular/http';
import { environment } from '../../../environments/environment';
import { ResultViewModel } from '../view-models/result-view-models';
import { SearchViewModel } from '../view-models/search-view-model';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class ApiService {

  userToken: string;

  constructor(private route:Router, private tokenService: TokenService, private http: HttpClient, private localizationService: LocalizationService) {
    this.userToken = this.tokenService.getToken();
    // alert(this.userToken)
  }

  private setHeaders(): HttpHeaders {

    this.userToken=this.tokenService.getToken();
    // alert(this.userToken);
    let headersConfig =
    {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'language': this.localizationService.getLanguage(),
      'token': this.tokenService.getToken()
    };
    return new HttpHeaders(headersConfig);
  }

  private setHeadersWithImage(): HttpHeaders {
    let headersConfig =
    {
      'Accept': 'application/json',
      'language': this.localizationService.getLanguage(),
      'token': this.tokenService.getToken()
    };
    return new HttpHeaders(headersConfig);
  }


  private formatErrors(error: any) {
    console.error(error);
    if(error.status=="401"){
      this.route.navigateByUrl("/login")
    }
    return Observable.throw(error);
  }

  get(path: string, params?: HttpParams): Observable<ResultViewModel> {
    //console.log(environment.api_url+"/"+path);
    //console.log(this.setHeaders());
     //console.log(JSON.stringify(params));
    return this.http.get(`${environment.api_url}${path}`, {headers: this.setHeaders(), params: params }).pipe(catchError(er=>this.formatErrors(er)),map(res => { return <ResultViewModel>res }));
  }
  getWithSearchViewModel(path: string, searchParams?: SearchViewModel): Observable<ResultViewModel> {
    // //console.log(environment.api_url+"/"+path);
    //console.log(searchParams)
    let params = new HttpParams()
    .set("text", searchParams.text)
    .set("departmentId", searchParams.departmentId.toString())
    .set("brandId", searchParams.brandId)
    .set("categoryId", searchParams.categoryId)
    .set("conditionId", searchParams.conditionId)
    .set("orderBy", searchParams.orderBy.toString())
    .set("pageIndex", searchParams.pageIndex.toString())
    .set("specificationId", searchParams.specificationId)
    .set("orderBy", searchParams.orderBy.toString());
    //console.log((params).toString());
    return this.http.get(`${environment.api_url}${path}`, { headers: this.setHeaders(),params:params }).pipe(catchError(er=>this.formatErrors(er)),map(res => { return <ResultViewModel>res }));
  }

  post(path: string, body: Object = {}): Observable<ResultViewModel> {
    return this.http.post(`${environment.api_url}${path}`, body, { headers: this.setHeaders() }).pipe(catchError(er=>this.formatErrors(er)), map(res => { return <ResultViewModel>res }));
  }

  update(path: string, body: Object = {}): Observable<ResultViewModel> {
    return this.http.put(`${environment.api_url}${path}`, body, { headers: this.setHeaders() }).pipe(catchError(er=>this.formatErrors(er)), map(res => { return <ResultViewModel>res }));
  }

  remove(path: string): Observable<ResultViewModel> {
    return this.http.delete(`${environment.api_url}${path}`, { headers: this.setHeaders() })
      .pipe(catchError(this.formatErrors), map(res => { console.log(res); return <ResultViewModel>res }));
  }

  upload(path: string, body: Object): Observable<ResultViewModel> {
    return this.http.post(`${environment.api_url}${path}`, body, { headers: this.setHeadersWithImage() })
      .pipe(map(res => {console.log(res); return <ResultViewModel>res }));
  }

  removeAttachment(path: string): Observable<ResultViewModel> {
    return this.http.get(`${environment.api_url}${path}`, { headers: this.setHeaders() }).pipe(map(res => { return <ResultViewModel>res }));
  }
}
