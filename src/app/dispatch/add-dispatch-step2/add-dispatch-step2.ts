import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Component, OnInit, AfterViewInit, NgZone, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {  AuthenticationService, UserService,LoggerService } from '../../_services/index';
import { LoginDetails } from '../../_models/user';
import { OrderService } from "../../orders/order.service";

/**
 * @title Table with pagination
 */
@Component({
  selector: 'add-dispatch-step2',
  styleUrls: ['add-dispatch-step2.scss'],
  templateUrl: 'add-dispatch-step2.html',
})
export class AddDispatchStep2Component  { 
  model:any={};
  data = [];
  couponValue;
  distanceValues;
  value1;
  newVal
  @ViewChild('distance') myTextArea: ElementRef;
  status=['Open', 'In progress', 'Cancelled', 'Closed'];

  dispatchData:any={};
  constructor(public userService: UserService,
    public router: Router,
    public loggerService:LoggerService,
    private orderService: OrderService) { }

  ngOnInit() {
   
    this.dispatchData= this.orderService.getOrderDatafromService();
    console.log( this.dispatchData);
  }
  ngAfterViewInit() {
  }
  submit() {
    this.model.dispatchOrderId=this.dispatchData.orderId;
    this.model.dispatchConsignee=this.dispatchData.orderConsignee;
    this.model.dispatchConsignor=this.dispatchData.orderConsignor;
    this.model.dispatchDriverFirstname=this.dispatchData.orderDriverFirstName;
    this.model.dispatchSource=this.dispatchData.orderSource;
    this.model.dispatchDestination=this.dispatchData.orderDestination;
    this.model.dispatchDate=this.dispatchData.orderStartDate;
    this.model.dispatchHorseNumber=this.dispatchData.orderHorseDetails;
   console.log("dispatch data",this.model);
    this.userService.addDispatchData(this.model)
      .subscribe(
      data => {
        this.data = data;
        this.loggerService.log("data", this.data);
        this.orderService.setDispatchDatafromService(this.data);

        this.router.navigate(['/add-coupon-step3']);
      },
      error => {
        this.router.navigate(['/']);

      });
  }



}


