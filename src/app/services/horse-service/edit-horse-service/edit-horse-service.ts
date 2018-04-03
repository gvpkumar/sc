import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Component, OnInit, AfterViewInit, NgZone, ElementRef, NgModule } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthenticationService, UserService, LoggerService } from '../../../_services/index';
import { LoginDetails } from '../../../_models/index';
/**
 * @title Table with pagination
 */
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'edit-horse-service',
  styleUrls: ['edit-horse-service.scss'],
  templateUrl: 'edit-horse-service.html',
})
export class EditHorseServiceComponent implements OnInit {

  model: any = {};
  data = [];
  userId;
  getData: any = [];
  horseNumber;
  output;
  today;

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
    this.today = this.formatDate(new Date());
  }

  formatDate(date) {
    const d = new Date(date), year = d.getFullYear();
    let month = '' + (d.getMonth() + 1),
      day = '' + d.getDate();
    if (month.length < 2) { month = '0' + month; }
    if (day.length < 2) { day = '0' + day; }
    return [year, month, day].join('-');
  }

  editDetails(id: String): any {

    this.userService.getHorseServiceDetails(id)
      .subscribe(
        data => {
          this.getData = data;
          this.loggerService.log(this.getData, 'getdata');
          this.horseNumber = this.getData.horseNumber;
          this.output = 'Updated Successfully';

          // this.router.navigate(['/Apartment-table']);
        },
        error => {
          this.router.navigate(['/']);
          //  this.alertService.error("Username or Password is Incorrect");

        });
  }
  update(): any {
    //  this.getData.horseAccessories=this.horseAccessories;

    console.log(this.getData, 'getdata');
    this.userService.updateHorseServiceDetails(this.getData)
      .subscribe(
        data => {
          this.success = true;
          this.getData = JSON.parse(JSON.stringify(data));
          console.log(this.getData, 'getdata');
          this.router.navigate(['/horse-services']);
        },
        error => {
          this.router.navigate(['/']);
          //  this.alertService.error("Username or Password is Incorrect");

        });
  }
}


