import { Component, OnInit } from '@angular/core';
import {  AuthenticationService,UserService,LoggerService } from '../../../_services/index';
import { LoginDetails } from '../../../_models/index';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'ms-toolbar-user-button',
  templateUrl: './toolbar-user-button.component.html',
  styleUrls: ['./toolbar-user-button.component.scss']
})
export class ToolbarUserButtonComponent implements OnInit {

  isOpen: boolean;

  model: any = {};
  userName;
  email;
  public loginDetails:LoginDetails;
   constructor(   public authenticationService: AuthenticationService,
           private router: Router,
           public loggerService: LoggerService,
 ){
   }

  ngOnInit()
  {
       let currentUser=localStorage.getItem('currentUser');    
      this.loggerService.log(currentUser,"currentUser");
      if (currentUser != null) {
       this.authenticationService.loginDetails = JSON.parse(currentUser);
       this.loggerService.log( this.authenticationService.loginDetails.userDetails.userName);
     }
     else{
       this.router.navigate[('/')];
     }
     
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  onClickOutside() {
    this.isOpen = false;
  }
  signOut()
  {
     this.authenticationService.logout();
     this.router.navigate(['/'])
  }
}
