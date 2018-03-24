import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Component, OnInit, AfterViewInit, NgZone, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthenticationService, UserService, LoggerService } from '../../_services/index';
import { LoginDetails } from '../../_models/index';
import { OrderService } from "../../orders/order.service";

/**
 * @title Table with pagination
 */
@Component({
  selector: 'add-coupon-step3',
  styleUrls: ['add-coupon-step3.scss'],
  templateUrl: 'add-coupon-step3.html',
})
export class AddCouponStep3Component implements OnInit {
  model: any = {};
  data: any = {};
  errorMessage1; errorMessage2;
  showError: boolean;
  couponValue;
  distanceValues;
  value1;
  newVal;
  dispatchData = [];
  stations = ['Internal', 'External'];
  @ViewChild('distance') myTextArea: ElementRef;

  couponData: any = {};
  constructor(public userService: UserService,
    public router: Router,
    public loggerService: LoggerService,
    private orderService: OrderService,
    public authenticationService: AuthenticationService
  ) {

  }
  getDispatchData() {

    this.userService.getDispatchData('All')
      .subscribe(
        data => {
          this.dispatchData = data;
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
          this.loggerService.log("data", this.data);

        },
        error => {
          this.router.navigate(['/']);
        });
  }



  ngOnInit() {
    this.distanceValues = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
    this.couponData = this.orderService.getDispatchDatafromService();
    console.log(this.couponData);
  }

  submit() {
    this.loggerService.log(this.model, "model")
    if (this.model.couponStartLocation == null) {
      this.showError = true;
      this.errorMessage1 = "Start Location is Required";
    }
    if (this.model.couponEndLocation == null) {
      this.showError = true;
      this.errorMessage2 = "End Location is Required";
    }
    if (this.model.couponStartLocation != null && this.model.couponEndLocation != null) {
      this.model.couponStartLocation = this.data.dispatchSource;
      this.model.couponEndLocation = this.data.dispatchDestination;
      this.model.couponRequestedBy = this.data.driverFirstname;
      this.model.couponHorseNumber = this.data.dispatchHorseNumber;
      this.model.couponIssuedBy = this.authenticationService.loginDetails.userDetails.userName;
      this.model.couponDistanceKilometers = this.value1;
      this.model.couponValue = this.couponValue;
      this.model.dispatchTripNumber = this.couponData.dispatchTripNumber;

      this.loggerService.log(this.model, "model")
      this.userService.addCouponData(this.model)
        .subscribe(
          data => {
            this.data = data;
            console.log("data", this.data);
            this.router.navigate(['/coupons']);
          },
          error => {
            this.router.navigate(['/']);

          });
    }
  }

  addTodo() {

    // var distance = document.getElementsByClassName("distance")[0].value;
    // let el = document.getElementsByClassName('distance')[0];
    let value = (document.getElementsByClassName('distance')[0] as HTMLInputElement).value;
    this.loggerService.log("value", value)
  }
  public onChange(event): void {
    this.value1 = (document.getElementsByClassName('distance')[0] as HTMLInputElement).value;
    // event will give you full breif of action';
    this.value1 = this.value1.replace(/\,/g, '');
    this.newVal = event.target.value;
    this.loggerService.log(this.newVal);
    this.loggerService.log("value", this.value1)
    this.couponValue = (this.value1 / this.newVal);
    this.loggerService.log(this.couponValue)
  }

}


