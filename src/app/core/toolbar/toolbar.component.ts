import { Component, Input, OnInit } from '@angular/core';
import * as screenfull from 'screenfull';
import {  AuthenticationService,UserService } from '../../_services/index';
import { LoginDetails } from '../../_models/index';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'ms-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input('quickpanel') quickpanel: any;
  @Input('sidenav') sidenav: any;
  isFullscreen: boolean = false;

  showBreadcrumbs: boolean = false;

  model: any = {};
  userName;
  email;
  public user:LoginDetails;
   constructor(   public authenticationService: AuthenticationService,
           private router: Router,
 ){
   }
  
 ngOnInit()
 {
  
    
 }

  toggleFullscreen() {
    if (screenfull.enabled) {
      screenfull.toggle();
      this.isFullscreen = !this.isFullscreen;
    }
  }
}
