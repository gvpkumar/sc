import { Component, OnInit } from '@angular/core';
import {  AuthenticationService,LoggerService } from '../_services/index';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {


    constructor(  
      public authenticationService: AuthenticationService,
      public loggerService:LoggerService) 
      {       
      }

      ngOnInit() {
        
      }

  
}