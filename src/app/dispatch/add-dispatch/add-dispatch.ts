import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Component, OnInit, AfterViewInit, NgZone, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthenticationService, UserService, LoggerService } from '../../_services/index';
import { LoginDetails } from '../../_models/index';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'add-dispatch',
  styleUrls: ['add-dispatch.scss'],
  templateUrl: 'add-dispatch.html',
})
export class AddDispatchComponent implements OnInit {
  model: any = {};
  data :any= [];
  couponValue;
  distanceValues;
  value1;
  newVal
  @ViewChild('distance') myTextArea: ElementRef;
  status=['Open', 'In progress', 'Cancelled', 'Closed'];

  orderData = [];
  constructor(public userService: UserService,
    public router: Router,
    public loggerService: LoggerService) {
    this.model.dispatchConsignor = "SHAANN CARRIERS";
  }
  ngOnInit() {
    this.getOrderData('All');
  }
  getOrderData(status) {
    this.userService.getOrderData(status)
      .subscribe(
      data => {
        this.orderData = data;
        console.log("data", this.orderData);
      },
      error => {
        //this.router.navigate(['/']);
      });
  }
  getOrderDatabyId(id) {
    console.log(id);
    this.userService.getOrderDetails(id)
      .subscribe(
      data => {
        this.data = data;
        this.loggerService.log("data", this.data);
      
      },
      error => {
        this.router.navigate(['/']);
      });
  }
  submit() {
    this.loggerService.log(this.model, "model")
    this.model.dispatchConsignor = "SHAANN CARRIERS";
    this.model.dispatchOrderId=this.data.orderId;
    this.model.dispatchConsignee=this.data.orderConsignee;
    this.model.dispatchConsignor=this.data.orderConsignor;
    this.model.dispatchDriverFirstname=this.data.orderDriverFirstName;
    this.model.dispatchSource=this.data.orderSource;
    this.model.dispatchDestination=this.data.orderDestination;
    this.model.dispatchDate=this.data.orderStartDate;
    this.model.dispatchHorseNumber=this.data.orderHorseDetails;
    this.userService.addDispatchData(this.model)
      .subscribe(
      data => {
        this.data = data;
        this.loggerService.log("data", this.data);
        this.router.navigate(['/dispatch']);
      },
      error => {
        this.router.navigate(['/']);
      });
  }



}


