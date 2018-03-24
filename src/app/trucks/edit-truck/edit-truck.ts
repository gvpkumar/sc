import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Component, OnInit, AfterViewInit, NgZone, ElementRef, NgModule } from '@angular/core';
import { Router, ActivatedRoute,Params } from "@angular/router";
import { AuthenticationService, UserService, LoggerService } from '../../_services/index';
import { LoginDetails } from '../../_models/index';
/**
 * @title Table with pagination
 */
@Component({
  selector: 'edit-truck',
  styleUrls: ['edit-truck.scss'],
  templateUrl: 'edit-truck.html',
})
export class EditTruckComponent implements OnInit {


  getData: any = {};
  success;
  userId;
  horseData = [];
  trailerData=[];
  constructor(public userService: UserService,
    public router: Router,
    public loggerService: LoggerService,
    public authService: AuthenticationService,
    private route: ActivatedRoute
      ) {
        this.getHorseData();
        this.getTrailerData();
  }
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.userId = params['id'];
      this.loggerService.log(this.userId);
    });
  
    this.editDetails(this.userId);

 }
 getHorseData() {
 
     this.userService.getHorseData()
       .subscribe(
       data => {
         this.horseData = data;
         this.loggerService.log("data", this.horseData);
        // this.router.navigate(['/horses']);
       },
       error => {
         this.router.navigate(['/']);
 
       });
   }
   getTrailerData() {
 
     this.userService.getTrailerData()
       .subscribe(
       data => {
         this.trailerData = data;
         this.loggerService.log("data", this.trailerData);
        // this.router.navigate(['/horses']);
       },
       error => {
         this.router.navigate(['/']);
 
       });
   }
  editDetails(id: String): any {

    this.userService.getTruckDetails(id)
      .subscribe(
      data => {
        this.getData = data;
        this.loggerService.log(this.getData, "getdata");    
      
        // this.router.navigate(['/Apartment-table']);
      },
      error => {
        this.router.navigate(['/']);
        //  this.alertService.error("Username or Password is Incorrect");

      });
  }
  update(): any {
    //this.getData.length=0;

   
    this.userService.updateTruckDetails(this.getData)
      .subscribe(
      data => {
        this.success = true;
        this.getData = JSON.parse(JSON.stringify(data));
        this.loggerService.log(this.getData, "getdata");

        this.router.navigate(['/trucks']);
      },
      error => {
        this.router.navigate(['/']);
        //  this.alertService.error("Username or Password is Incorrect");

      });
  }
}


