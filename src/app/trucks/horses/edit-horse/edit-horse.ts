import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Component, OnInit, AfterViewInit, NgZone, ElementRef, NgModule } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { AuthenticationService, UserService, LoggerService } from '../../../_services/index';
import { LoginDetails } from '../../../_models/index';
/**
 * @title Table with pagination
 */
@Component({
  selector: 'edit-horse',
  styleUrls: ['edit-horse.scss'],
  templateUrl: 'edit-horse.html',
})
export class EditHorseComponent {

  model: any = {};
  data = [];
  userId;
  getData: any = [];
  horseNumber;
  output;
 
  success: boolean;
  constructor(public userService: UserService,
    public router: Router,
    public loggerService: LoggerService,
    public authService: AuthenticationService,
    private route: ActivatedRoute, ) {

  }
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.userId = params['id'];
      this.loggerService.log(this.userId);
    });
    this.editDetails(this.userId);
  }
  addHorseAccessories()
  {
   this.getData.horseAccessories.push({
            dateFitted: "",
            make: "",
            number: "",
            size: "",
            tyrePositions: ""
          
      });
  }
  editDetails(id: String): any {
 
    this.userService.getHorseDetails(id)
      .subscribe(
      data => {
        this.getData = data;
        this.loggerService.log(this.getData, "getdata");
        this.horseNumber = this.getData.horseNumber;
        this.output = "Updated Successfully";

        // this.router.navigate(['/Apartment-table']);
      },
      error => {
        this.router.navigate(['/']);
        //  this.alertService.error("Username or Password is Incorrect");

      });
  }
  update(): any {
  //  this.getData.horseAccessories=this.horseAccessories;
     
    console.log(this.getData,"getdata");
    this.userService.updateHorseDetails(this.getData)
      .subscribe(
      data => {
        this.success = true;
        this.getData = JSON.parse(JSON.stringify(data));
        console.log(this.getData, "getdata");
        this.router.navigate(['/horses']);
      },
      error => {
        this.router.navigate(['/']);
        //  this.alertService.error("Username or Password is Incorrect");

      });
  }
}


