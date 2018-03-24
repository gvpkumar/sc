import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, PageEvent } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import { AuthenticationService, UserService, LoggerService } from '../../_services/index';
import { DialogOrderComponent } from '../dialogService';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'orders',
  styleUrls: ['view-order.scss'],
  templateUrl: 'view-order.html',
})
export class OrderComponent {

  orderStatus= 'All';
  isLoggedIn: boolean = false;
  statusList = ['All', 'Open', 'Closed', 'Pending'];
  getData;
  pageEvent: PageEvent;

  displayedColumns = ['customColumn1', 'orderCustomerName', 'orderConsignee',
    , 'orderSource', 'orderDestination', 'orderStartDate',
    'orderEndDate', 'orderDriverFirstName', 'orderHorseDetails', 'orderStatus', 'orderTripCost', 'edit'];
  exampleDatabase: ExampleHttpDao | null;
  dataSource = new MatTableDataSource();

  resultsLength = 0;
  isLoadingResults = false;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private http: HttpClient,
    public router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    public loggerService: LoggerService,
    public dialog: MatDialog) { }
  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngOnInit() {
    this.isLoadingResults = true;
    let currentUser = localStorage.getItem('currentUser');
    this.loggerService.log(currentUser, "currentUser");
    this.authenticationService.loginDetails = JSON.parse(currentUser);
    console.log(this.orderStatus)
    this.getOrderData(this.orderStatus);
  }

  onStatusChange(status){
    this.orderStatus = status;
    this.getOrderData(status);
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  openDialog(id): void {
    console.log(id);
    let dialogRef = this.dialog.open(DialogOrderComponent, {
      width: '400px',
      height: '160px',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      setTimeout(() => {
        this.getOrderData(this.orderStatus);
      });
    });
  }
  getOrderData(status) {
    this.exampleDatabase = new ExampleHttpDao(this.http, this.authenticationService, this.userService);

    Observable.merge()
      .startWith(null)
      .switchMap(() => {
        this.isLoadingResults = true;
        return this.exampleDatabase!.getCustomUrlsCreatedList(status);
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
        this.loggerService.log(this.dataSource.data);
        this.dataSource.paginator = this.paginator;
        //  this.loggerService.log("Received Data: ",JSON.stringify(data));
      });

  }

}

export interface customUrlInfo {
  name: string;
  position: number;
  address: string;
  phone: string;
}



/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDao {

  model: any = {
  };
  urldetails: customUrlInfo[];

  constructor(private http: HttpClient,
    public authenticationService: AuthenticationService,
    private userService: UserService, ) {

  }



  //Api call to Fetch all the created url Links.

  getCustomUrlsCreatedList(status): Observable<customUrlInfo[]> {
    // this.model.userId = "sravanthi@smartrobos.com";

    return this.userService.getOrderData(status);

  }

}