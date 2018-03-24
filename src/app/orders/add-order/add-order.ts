import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Component, OnInit, AfterViewInit, NgZone, ElementRef, NgModule } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthenticationService, UserService, LoggerService } from '../../_services/index';
import { LoginDetails } from '../../_models/index';
import { OrderService } from '../order.service';
//import {  FormControl,  FormGroup,  FormGroupDirective,  NgForm,  Validators} from '@angular/forms';

//import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'add-order',
  styleUrls: ['add-order.scss'],
  templateUrl: 'add-order.html',
})
export class AddOrderComponent implements OnInit {
  customers: any;
  patternTripCost = /^\d+$/;
  model: any = {};

  data = []; data1 = {};
  trucksData = [];
  driversData = [];
  getData: any = {};
  status = ['Open', 'In progress', 'Cancelled', 'Closed'];
  constructor(public userService: UserService,
    public router: Router,
    public loggerService: LoggerService,
    private orderService: OrderService) {
    this.model.orderConsignor = "SHAANN CARRIERS";
  }

  ngOnInit() {
    this.getTruckData();
    this.getDriversData();
    this.getCustomers();
  }

  getCustomers() {
    this.userService.getCustomers().subscribe( data => {
      console.log(data);
      this.customers = data;
    }, error => { }, () => { });
  }
  getTruckData() {

    this.userService.getTrucksData()
      .subscribe(
        data => {
          this.trucksData = data;
          console.log("data", this.trucksData);
          // this.router.navigate(['/horses']);
        },
        error => {
          this.router.navigate(['/']);

        });
  }
  getDriversData() {

    this.userService.getDriversData()
      .subscribe(
        data => {
          this.driversData = data;
          console.log("data", this.driversData);
          // this.router.navigate(['/horses']);
        },
        error => {
          this.router.navigate(['/']);

        });
  }

  submit() {
    this.loggerService.log(this.model, "model");
    this.model.orderHorseDetails = this.getData.truckId;
    this.model.orderDriverFirstName = this.getData.driverFirstName;
    this.model.orderConsignor = "SHAANN CARRIERS";
    this.userService.addOrderData(this.model)
      .subscribe(
        data => {
          this.data = data;
          this.orderService.setOrderDatafromService(this.data);
          this.loggerService.log("data", this.data);
          this.router.navigate(['/orders']);
          //this.router.navigate(['/add-dispatch-step2']);
        },
        error => {
          this.router.navigate(['/']);

        });
  }
}


