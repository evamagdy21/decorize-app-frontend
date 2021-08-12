
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/account/auth.service';



@Component({
    moduleId: module.id,
    selector: 'register',
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css']
})
export class RegisterComponent implements OnInit {
    form: any = {
        username: null,
        email: null,
        password: null
    };
    isSuccessful = false;
    isSignUpFailed = false;
    errorMessage = '';

    constructor(
        private activatedRoute: ActivatedRoute,
        private route: Router, private authService: AuthService) { }
    ngOnInit() {

    }


    onSubmit(): void {
        const { username, email, password } = this.form;
    
        this.authService.register(username, email, password).subscribe(
          data => {
            console.log(data);
            this.isSuccessful = true;
            this.isSignUpFailed = false;
          },
          err => {
            this.errorMessage = err.error.message;
            this.isSignUpFailed = true;
          }
        );
      }


}

