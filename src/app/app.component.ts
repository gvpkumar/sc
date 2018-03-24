import { Component ,AfterViewInit} from '@angular/core';
import { Router, NavigationEnd,Params,ActivatedRoute } from '@angular/router';
import {  AuthenticationService,UserService,LoggerService } from './_services/index';
import { LoginDetails } from './_models/index';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent  {
 // userName:string;
 model: any = {};
 userName;
 expiery;
 email;
 userId;
 param1;
 
 public user:LoginDetails;
  constructor(   
          public authenticationService: AuthenticationService,
          private router: Router,
          public loggerService:LoggerService,
          private route:ActivatedRoute
){



}
 
/*ngAfterViewInit()
{
  this.userId = window.location.pathname.slice(1);
  this.router.events
  .filter(event => event instanceof NavigationEnd)
  .subscribe(e => {
    console.log('prev:', this.userId);
    this.userId = e;
  });
}*/
ngOnInit()
{
     let currentUser=localStorage.getItem('currentUser');    
     console.log(currentUser,"currentUser");
     if(currentUser===null)  
     {
      this.router.navigate(['/']);
     }
    else{
      this.router.navigate(['/trucks']);
     }
    
}

}
