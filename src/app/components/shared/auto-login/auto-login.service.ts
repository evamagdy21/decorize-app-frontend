
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ApiService } from '../../../shared/services/api.service';


@Injectable({
    providedIn: 'root'
})

export class AutoLoginService {

    constructor(private apiService: ApiService) { }
    Post(model): any {
       return this.apiService.post('/Subscriber/POST',model);
    }
    autoLogin(){
        return this.apiService.get('/user/autoLogin');
        
    }
    signOut() {
        // alert("signout");
        return this.apiService.get(`/User/SignOut`);
      }
}