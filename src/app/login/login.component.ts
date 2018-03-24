
import { Component, OnInit,AfterViewInit,NgZone,ElementRef} from '@angular/core';
import {Router,ActivatedRoute} from "@angular/router";
import {  AuthenticationService,LoggerService } from '../_services/index';
import { LoginDetails } from '../_models/index';

declare const gapi: any;
@Component({
  
   selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
 

})
export class LoginComponent implements OnInit {
 model: any = {};
    loading = false;
    returnUrl: string;
    data:any={}
isLoggedIn;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        public loggerService:LoggerService) { }

    ngOnInit() {
        // reset login status

        // get return url from route parameters or default to '/'
       this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser != null) {
          this.authenticationService.loginDetails = currentUser;
          
        }
        else{
            this.authenticationService.logout();
        }
   
    }

    login() {
       
        this.loading = true;
        this.authenticationService.login(this.model)
               .subscribe(
                data => {
                    this.data=data;
                    this.loggerService.log("data",this.data);
                    this.router.navigate(['/trucks']);
                 },
                error => {
                   this.router.navigate(['/']);
               
                });
    }
}