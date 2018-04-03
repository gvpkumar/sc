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
  selector: 'edit-trailer',
  styleUrls: ['edit-trailer.scss'],
  templateUrl: 'edit-trailer.html',
})
export class EditTrailerComponent implements OnInit {
  today;
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
    this.today = this.formatDate(new Date());
  }

  removeAccessory(index) {
    if (this.getData.horseAccessories.length) {
      this.getData.horseAccessories.splice(index, 1);
    }
  }

  formatDate(date) {
    const d = new Date(date), year = d.getFullYear();
    let month = '' + (d.getMonth() + 1),
      day = '' + d.getDate();
    if (month.length < 2) { month = '0' + month; }
    if (day.length < 2) { day = '0' + day; }
    return [year, month, day].join('-');
  }

  addTrailerAccessories() {
    this.getData.trailerAccessories.push({
      dateFitted: '',
      make: '',
      number: '',
      size: '',
      tyrePositions: ''

    });
  }
  editDetails(id: String): any {

    this.userService.getTrailerDetails(id)
      .subscribe(
        data => {
          this.getData = data;
          this.loggerService.log(this.getData, 'getdata');
          this.trailerNumber = this.getData.trailerNumber;
          this.output = 'Updated Successfully';

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
          this.loggerService.log(this.getData, 'getdata');
          this.router.navigate(['/trailers']);
        },
        error => {
          this.router.navigate(['/']);
          //  this.alertService.error("Username or Password is Incorrect");

        });
  }
}


