import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Component, OnInit, NgZone, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService, UserService, LoggerService } from '../../_services/index';
import { OrderService } from '../../orders/order.service';

/**
 * @title Table with pagination
 */
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'add-coupon',
  styleUrls: ['add-coupon.scss'],
  templateUrl: 'add-coupon.html',
})
export class AddCouponComponent implements OnInit {
  couponClosingMeter = '';
  couponOpeningMeter = '';
  couponFillingStation: string;
  model = {
    'couponApprovedBy': '',
    'couponClosingMeter': 0,
    'couponCreateTimestamp': '',
    'couponCreateUser': '',
    'couponDate': '',
    'couponDistanceKilometers': 0,
    'couponEndLocation': '',
    'couponFillingStation': '',
    'couponHorseNumber': '',
    'couponId': 0,
    'couponIssuedBy': '',
    'couponMileage': 0,
    'couponOpeningMeter': 0,
    'couponRequestedBy': '',
    'couponStartLocation': '',
    'couponStatus': '',
    'couponUpdatedTimestamp': '',
    'couponUpdatedUser': '',
    'couponValue': '',
    'dispatchTripNumber': 0
  };
  today;
  data = {};
  errorMessage1;
  errorMessage2;
  showError: boolean;
  couponValue;
  distanceValues = [5, 6, 7, 8];
  value1;
  newVal;
  stations = ['Internal', 'External'];
  dispatchData = [];
  getData: any = {};
  loggedinUser;
  status = ['Open', 'In progress', 'Cancelled', 'Closed'];
  @ViewChild('distance') myTextArea: ElementRef;

  constructor(public userService: UserService, public router: Router, public loggerService: LoggerService) { }

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(currentUser);
    if (currentUser != null) {
      this.loggedinUser = currentUser.userDetails.userName;
      this.model.couponIssuedBy = this.loggedinUser;
      console.log(this.loggedinUser);
    }
    this.getDispatchData('All');
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

  getDispatchData(status) {
    this.userService.getDispatchData(status)
      .subscribe(
        data => {
          this.dispatchData = data;
          this.model.couponRequestedBy = data.dispatchDriverFirstname;
          console.log('data', this.dispatchData);
          // this.router.navigate(['/horses']);
        },
        error => {
          this.router.navigate(['/']);
        });
  }

  getDispatchDatabyId(id) {
    console.log(id);
    this.userService.getDispatchDetails(id)
      .subscribe(
        data => {
          this.data = data;
          this.model.couponStartLocation = data.dispatchSource;
          this.model.couponEndLocation = data.dispatchDestination;
          this.model.couponHorseNumber = data.dispatchHorseNumber;
          this.loggerService.log('data', data);
        },
        error => {
          this.router.navigate(['/']);
        });
  }

  submit() {
    this.model.couponIssuedBy = this.loggedinUser;
    this.model.couponFillingStation = this.couponFillingStation;
    this.model.couponOpeningMeter = +this.couponOpeningMeter;
    this.model.couponClosingMeter = +this.couponClosingMeter;
    this.loggerService.log(this.model, 'model');
    if (this.model.couponStartLocation == null) {
      this.showError = true;
      this.errorMessage1 = 'Start Location is Required';
    }
    if (this.model.couponEndLocation == null) {
      this.showError = true;
      this.errorMessage2 = 'End Location is Required';
    }
    if (this.model.couponStartLocation != null && this.model.couponEndLocation != null) {
      this.model.couponDistanceKilometers = this.value1;
      this.model.couponValue = this.couponValue;

      this.loggerService.log(this.model, 'model');
      this.userService.addCouponData(this.model)
        .subscribe(
          data => {
            this.data = data;
            console.log('data', this.data);
            this.router.navigate(['/coupons']);
          },
          error => {
            // this.router.navigate(['/']);
          });
    }
  }

  addTodo() {
    // var distance = document.getElementsByClassName('distance')[0].value;
    // let el = document.getElementsByClassName('distance')[0];
    const value = (document.getElementsByClassName('distance')[0] as HTMLInputElement).value;
    this.loggerService.log('value', value);
  }

  public onChange(event): void {
    this.value1 = (document.getElementsByClassName('distance')[0] as HTMLInputElement).value;
    // event will give you full breif of action';
    this.value1 = this.value1.replace(/\,/g, '');
    this.newVal = event.target.value;
    this.loggerService.log(this.newVal);
    this.loggerService.log('value', this.value1);
    this.couponValue = (this.value1 / this.newVal);
    this.loggerService.log(this.couponValue);
  }
}


