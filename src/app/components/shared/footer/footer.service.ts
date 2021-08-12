import { ApiService } from './../../../shared/services/api.service';

import { Injectable } from '@angular/core';
import { SubscribeViewModel } from './subscribe-view-model';


@Injectable({
    providedIn: 'root'
})

export class FooterService {
    
    constructor(private apiService: ApiService) { }
    Post(model: SubscribeViewModel): any {
       return this.apiService.post('/Subscriber/POST',model);
    }

    getFooterPagesList()
    {
        return this.apiService.get("/Page/GetPagesList")    
    }

}