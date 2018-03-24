import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Component, OnInit, AfterViewInit, NgZone, ElementRef, NgModule } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { AuthenticationService, UserService, LoggerService } from '../../../_services/index';
import { LoginDetails } from '../../../_models/index';
/**
 * @title Table with pagination
 */
@Component({
  selector: 'edit-trailer',
  styleUrls: ['edit-trailer.scss'],
  templateUrl: 'edit-trailer.html',
})
export class EditTrailerComponent {

  model: any = {};
  data = [];
  userId;
  getData: any = [];
  trailerNumber;
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
  addTrailerAccessories()
  {
   this.getData.trailerAccessories.push({
            dateFitted: "",
            make: "",
            number: "",
            size: "",
            tyrePositions: ""
          
      });
  }
  editDetails(id: String): any {

    this.userService.getTrailerDetails(id)
      .subscribe(
      data => {
        this.getData = data;
        this.loggerService.log(this.getData, "getdata");
        this.trailerNumber = this.getData.trailerNumber;
        this.output = "Updated Successfully";

        // this.router.navigate(['/Apartment-table']);
      },
      error => {
        this.router.navigate(['/']);
        //  this.alertService.error("Username or Password is Incorrect");

      });
  }
  update(): any {

    this.userService.updateTrailerDetails(this.getData)
      .subscribe(
      data => {
        this.success = true;
        this.getData = JSON.parse(JSON.stringify(data));
        this.loggerService.log(this.getData, "getdata");
        this.router.navigate(['/trailers']);
      },
      error => {
        this.router.navigate(['/']);
        //  this.alertService.error("Username or Password is Incorrect");

      });
  }
}


