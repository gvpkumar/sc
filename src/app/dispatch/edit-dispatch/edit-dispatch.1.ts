import { MatPaginator, MatTableDataSource, PageEvent } from '@angular/material';
import { Component, OnInit, AfterViewInit, NgZone, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { AuthenticationService, UserService, LoggerService } from '../../_services/index';
import { LoginDetails } from '../../_models/index';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
/**
 * @title Table with pagination
 */
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'edit-dispatch',
  styleUrls: ['edit-dispatch.scss'],
  templateUrl: 'edit-dispatch.html',
})
export class EditDispatchComponent implements OnInit {
  model: any = {};
  data = [];
  couponValue;
  distanceValues;
  value1;
  newVal;
  getData: any = {};
  userId: String;
  output;
  showTable: boolean = false;
  showTableData: boolean;
  challanNumber;
  success: boolean;
  @ViewChild('distance') myTextArea: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatPaginator) paginator1: MatPaginator;

  pageEvent: PageEvent;
  displayedColumns = ['customColumn1', 'grNumber', 'consignor', 'consignee', 'truckNumber', 'truckDriver', 'edit'];
  displayedColumns1 = ['customColumn1', 'grNumber', 'consignor', 'consignee', 'truckNumber', 'truckDriver'];
  exampleDatabase: ExampleHttpDao | null;

  dataSource = new MatTableDataSource();
  dataSource1 = new MatTableDataSource();
  resultsLength = 0;
  isLoadingResults = false;
  isRateLimitReached = false;

  constructor(public userService: UserService,
    private route: ActivatedRoute,
    public router: Router,
    public http: HttpClient,
    public loggerService: LoggerService,
    public authenticationService: AuthenticationService) {

  }
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.userId = params['id'];
      this.loggerService.log(this.userId);
    });
    this.editDetails(this.userId);
    this.getCargoData(this.userId);
  }

  editDetails(id: String): any {

    this.userService.getDispatchDetails(id)
      .subscribe(
        data => {

          this.getData = data;
          console.log(this.getData)
          this.loggerService.log(this.getData, "getdata");

          this.output = "Updated Successfully";

          // this.router.navigate(['/Apartment-table']);
        },
        error => {
          this.router.navigate(['/']);
          //  this.alertService.error("Username or Password is Incorrect");

        });
  }
  update(): any {
    //this.getData.length=0;

    this.userService.updateDispatchDetails(this.getData, this.userId)
      .subscribe(
        data => {
          this.success = true;
          this.getData = JSON.parse(JSON.stringify(data));
          this.loggerService.log(this.getData, "getdata");

          this.router.navigate(['/dispatch']);
        },
        error => {
          this.router.navigate(['/']);
          //  this.alertService.error("Username or Password is Incorrect");

        });
  }

  addCargo() {
    this.showTable = true;
    this.exampleDatabase = new ExampleHttpDao(this.http, this.authenticationService, this.userService);


    Observable.merge()
      .startWith(null)
      .switchMap(() => {
        this.isLoadingResults = true;
        return this.exampleDatabase!.getCustomUrlsCreatedList();
      })
      .map(data => {
        // Flip flag to show that loading has finished.
        this.isLoadingResults = false;
        this.isRateLimitReached = false;
        this.resultsLength = data.length;
        return data;
      })
      .catch(() => {
        this.isLoadingResults = false;
        // Catch if the GitHub API has reached its rate limit. Return empty data.
        this.isRateLimitReached = true;
        return Observable.of([]);
      })
      .subscribe(data => {
        this.dataSource.data = data;
        this.loggerService.log(this.dataSource);
        this.dataSource.paginator = this.paginator;
        //  this.loggerService.log("Received Data: ",JSON.stringify(data));
      });

  }
  getCargoData(userId) {
    this.exampleDatabase = new ExampleHttpDao(this.http, this.authenticationService, this.userService);


    Observable.merge()
      .startWith(null)
      .switchMap(() => {
        this.isLoadingResults = true;
        return this.exampleDatabase!.getCargoDatabyId(this.userId);

      })
      .map(data => {
        // Flip flag to show that loading has finished.
        this.isLoadingResults = false;
        this.isRateLimitReached = false;
        this.resultsLength = data.length;
        console.log(data);
        return data;
      })
      .catch(() => {
        this.isLoadingResults = false;
        // Catch if the GitHub API has reached its rate limit. Return empty data.
        this.isRateLimitReached = true;
        return Observable.of([]);
      })
      .subscribe(data => {
        this.dataSource1.data = data;
        this.showTableData = true;
        console.log(this.dataSource1.data);
        this.loggerService.log(this.dataSource);
        this.dataSource1.paginator = this.paginator;
        //  this.loggerService.log("Received Data: ",JSON.stringify(data));
      });

  }

  submit() {
    this.model = this.selectedValue;
    console.log(this.model);
    this.userService.updatechallanCargoDetails(this.model, this.userId)
      .subscribe(
        data => {
          this.showTable = false;
          //  window.location.reload();
          // this.getData = JSON.parse(JSON.stringify(data)); 
          /// this.loggerService.log (  this.getData,"getdata" );

          // this.router.navigate(['/challans']);
        },
        error => {
          this.router.navigate(['/']);
          //  this.alertService.error("Username or Password is Incorrect");

        });

  }
  selectedValue = [];
  change(e, type) {
    console.log(e.checked);
    console.log(type);
    if (e.checked) {
      this.selectedValue.push(type);
    }
  }
}
export interface customUrlInfo {
  name: string;
  position: number;
  address: string;
  phone: string;
}
export class ExampleHttpDao {

  model: any = {
  };
  urldetails: customUrlInfo[];

  constructor(private http: HttpClient,
    public authenticationService: AuthenticationService,
    private userService: UserService, ) {

  }



  // Api call to Fetch all the created url Links.


  getCustomUrlsCreatedList(): Observable<customUrlInfo[]> {
    // Debug console.log("Model ",ipAddress);
    return this.userService.getDispatchData('All');
  }

  getCargoDatabyId(model): Observable<customUrlInfo[]> {
    // this.model.userId = "sravanthi@smartrobos.com";
    const id = model;
    return this.userService.getChallanCargoDataassociated(id);

  }


}





